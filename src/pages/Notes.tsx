import { useEffect, useState } from "react";
import { sortBy, filter } from 'remeda'
import { Typography, notification, Empty, Tooltip, FloatButton } from "antd";
import NoteCard from "../components/NoteCard";
import { NoteType, TagType } from '../data/note';
import HeatMap, { HeatMapValue } from '@uiw/react-heat-map';
import { getHeatMap, getNotes, getNotesByDate, getNotesByTagID } from "../api/api";
import dayjs from "dayjs";
import TagsList from "../components/TagsList";

const { Title, Text } = Typography;

declare type NotesProps = {
    tags: TagType[];
    onEditNote: (note: NoteType) => void;
    onNewNote: () => void;
}

const Notes: React.FC<NotesProps> = (props) => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [loading, setLoading] = useState<boolean>(false); //todo: loading
    const [title, setTitle] = useState<string>('📔 Notes');
    const [api, setApi] = useState<(offset: number, limit: number) => Promise<{ data: { notes: NoteType[] } }>>(() => getNotes);
    const [heatMapValue, setHeatMapValue] = useState<HeatMapValue[]>([]);
    const [filters, setFilters] = useState<((note: NoteType) => boolean)[]>([_ => true]);

    useEffect(() => {
        api(0, 5).then(
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

    const notesFilter = (notes: NoteType[]) => {
        return filter(notes, note => filters.every(filter => filter(note)));
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

    return (
        <div className='flex justify-between'>
            <FloatButton tooltip={<div>✍🏼 新建笔记</div>} onClick={props.onNewNote} type="primary" />
            <div className='px-16 py-8 w-full h-screen overflow-scroll'>
                <Title>{title}</Title>
                {notesFilter(notes).length === 0 ? <Empty description={<Text className="text-gray-400">暂无笔记</Text>} className="w-full" /> :
                    <>
                        {notesFilter(notes).map(note => <NoteCard key={note.id} note={note} onDelete={handleDelete} onEdit={props.onEditNote} />)}
                        <div className="cursor-pointer w-full text-center text-gray-400" onClick={handleLoadMore}>点击这里，加载更多</div>
                    </>
                }
            </div>
            <div className='pr-4 py-8 h-full w-min'>
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
                                    setTitle(data.date);
                                    setFilters([note => dayjs(note.create_date).isSame(data.date, 'day')]);
                                    const seletedDay = dayjs(data.date)
                                    setApi(() => async (offset: number, limit: number) => getNotesByDate(seletedDay.valueOf(), seletedDay.endOf('day').valueOf(), offset, limit));
                                }} />
                            </Tooltip>
                        );
                    }}
                />
                <Title className="mt-0" level={3}>🏷️ Tags</Title>
                <TagsList tags={props.tags} onClick={(tag) => {
                    setFilters([note => filter(note.tags, item => item.name.toLowerCase() === tag.name.toLocaleLowerCase()).length > 0]);
                    setTitle(tag.name);
                    setApi(() => async (offset: number, limit: number) => getNotesByTagID(tag.id, offset, limit));
                }} />
            </div>
        </div>
    );
};


export default Notes;