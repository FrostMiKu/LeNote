import { useEffect, useState } from "react";
import { sortBy, filter } from 'remeda'
import { Typography, notification, Empty, Tooltip, FloatButton } from "antd";
import NoteCard from "../components/NoteCard";
import { NoteType, TagType } from '../data/note';
import HeatMap, { HeatMapValue } from '@uiw/react-heat-map';
import { getHeatMap, getNotes, getNotesByDate, getNotesByTagID } from "../api/api";
import dayjs from "dayjs";
import TagsList from "../components/TagsList";
import { FilterOutlined } from "@ant-design/icons";
import { randomColor } from "../utils";

const { Title, Text } = Typography;

type NotesProps = {
    tags: TagType[];
    onEditNote: (note: NoteType) => void;
    onNewNote: () => void;
}

type NoteFilter = TagType & {
    filter: (note: NoteType) => boolean;
    api?: (offset: number, limit: number) => Promise<{ data: { notes: NoteType[] } }>;
};

const mockxx = [
    {
        "id": 1,
        "name": "学习",
        "color": "#f50",
        "filter": () => true
    }
]

const Notes: React.FC<NotesProps> = (props) => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [loading, setLoading] = useState<boolean>(false); //todo: loading
    const [title, setTitle] = useState<string>('📔 Notes');
    const [api, setApi] = useState<(offset: number, limit: number) => Promise<{ data: { notes: NoteType[] } }>>(() => getNotes);
    const [heatMapValue, setHeatMapValue] = useState<HeatMapValue[]>([]);
    const [filters, setFilters] = useState<NoteFilter[]>([]);

    useEffect(() => {
        api(0, 10).then(
            res => {
                setNotes(res.data.notes);
            }
        );
    }, [api]);

    useEffect(() => {
        getHeatMap().then(
            res => {
                setHeatMapValue(res.data.heatmap);
            }
        );
    }, []);

    useEffect(() => {
        if (filters.length === 0) {
            setTitle('📔 Notes');
            setApi(() => getNotes);
        } else {
            setTitle('📔 Notes - Filter');
            setApi(() => filters[filters.length-1].api ?? getNotes);
        }
    }, [filters]);

    const notesFilter = (notes: NoteType[]) => {
        return filter(notes, note => filters.every(i => i.filter(note)));
    }

    const handleLoadMore = () => {
        setLoading(true); //todo: loading
        api(notes.length, 10).then(
            res => {
                if (res.data.notes.length === 0) {
                    notification.open({
                        message: '没有更多了😊！',
                    });
                } else {
                    setNotes(
                        sortBy(notes.concat(res.data.notes), [note => note.create_date, 'desc'])
                    );
                }
                setLoading(false);
            }).catch(() =>
                notification.open({
                    message: '加载失败😭！',
                })
            );
    }

    const handleDelete = (id: number) => {
        setNotes(filter(notes, note => note.id !== id));
    }

    const handleFilterClose = (tag: TagType) => {
        setFilters(filter(filters, i => i.id !== tag.id));
    }

    return (
        <div className='flex justify-between'>
            <FloatButton tooltip={<div>✍🏼 新建笔记</div>} onClick={props.onNewNote} type="primary" />
            <div className='px-16 py-8 w-full h-screen overflow-scroll'>
                <Title>{title}</Title>
                {filters.length > 0 ?
                    <>
                        <Text className="text-gray-400"><FilterOutlined /> Filters: </Text>
                        <TagsList className="mb-4" closeable tags={filters} onClose={handleFilterClose} />
                    </> : null
                }
                {notesFilter(notes).length === 0 ? <Empty description={<Text className="text-gray-400">暂无笔记</Text>} className="w-full" /> :
                    <>
                        {notesFilter(notes).map(note => <NoteCard key={note.id} note={note} onDelete={handleDelete} onEdit={props.onEditNote} />)}
                        <div className="cursor-pointer w-full text-center text-gray-400" onClick={handleLoadMore}>点击这里，加载更多</div>
                    </>
                }
            </div>
            <div className='px-4 py-8 h-full w-min'>
                <Title level={3}>📅 Calendar</Title>
                <HeatMap
                    width={300}
                    value={heatMapValue}
                    style={{ color: '#ad001d', height: 130 }}
                    legendCellSize={0}
                    startDate={dayjs().subtract(19, 'week').toDate()}
                    endDate={new Date()}
                    rectProps={{
                        rx: 5
                    }}
                    rectRender={(props, data) => {
                        return (
                            <Tooltip key={props.key} placement="top" title={`${data.date} 共 ${data.count || 0} 条 Note`}>
                                <rect {...props} onClick={() => {
                                    const seletedDay = dayjs(data.date);
                                    setFilters([
                                        ...filter(filters, i => i.id !== 'date'),
                                        {
                                            id: 'date',
                                            name: '📅 ' + data.date,
                                            color: randomColor(),
                                            filter: note => dayjs(note.create_date).isSame(data.date, 'day'),
                                            api: async (offset: number, limit: number) => getNotesByDate(seletedDay.valueOf(), seletedDay.endOf('day').valueOf(), offset, limit)
                                        }
                                    ]);
                                    // setApi(() => async (offset: number, limit: number) => getNotesByDate(seletedDay.valueOf(), seletedDay.endOf('day').valueOf(), offset, limit));
                                }} />
                            </Tooltip>
                        );
                    }}
                />
                <Title className="mt-0" level={3}>🏷️ Tags</Title>
                <TagsList tags={props.tags} clickable onClick={(tag) => {
                    setFilters([
                        ...filter(filters, i => i.id !== tag.id),
                        {
                            id: tag.id,
                            name: tag.name,
                            color: tag.color,
                            filter: note => filter(note.tags, item => item.name.toLowerCase() === tag.name.toLocaleLowerCase()).length > 0,
                            api: async (offset: number, limit: number) => getNotesByTagID(tag.id as number, offset, limit)
                        }
                    ]);
                }} />
            </div>
        </div>
    );
};


export default Notes;