import { useEffect, useState } from "react";
import { sortBy, filter, type } from 'remeda'
import { Typography, notification, Empty, Button, Tooltip, FloatButton } from "antd";
import NoteCard from "../components/NoteCard";
import { NoteType, TagType } from '../data/note';
import HeatMap, { HeatMapValue } from '@uiw/react-heat-map';
import { getHeatMap, getNotes } from "../api/api";
import { notes2HeatmapData } from "../utils";
import dayjs from "dayjs";
import TagsList from "../components/TagsList";
import { TagsFilled } from "@ant-design/icons";

const { Title, Text } = Typography;

interface NotesProps {
    notes: NoteType[];
    tags: TagType[];
    onNotesChange: (notes: NoteType[]) => void;
    onEditNote: (note: NoteType) => void;
}

const Notes: React.FC<NotesProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('📔 Notes');
    const [heatMapValue, setHeatMapValue] = useState<HeatMapValue[]>([]);
    const [filters, setFilters] = useState<((note:NoteType)=>boolean)[]>([_=>true]);
    const { notes, onNotesChange } = props;

    useEffect(() => {
        if (notes.length === 0) {
            getNotes(0, 10).then(
                res => {
                    onNotesChange(
                        sortBy(res.data.notes as NoteType[], [note => note.create_date, 'desc'])
                    );
                });
        }
    }, [notes]);

    useEffect(()=>{
        getHeatMap().then(
            res => {
                setHeatMapValue(res.data.heatmap);
            }
        );
    },[]);

    const notesFilter = (notes: NoteType[]) => {
        return filter(notes, note => filters.every(filter => filter(note)));
    }

    const handleLoadMore = () => {
        setLoading(true); //todo: loading
        getNotes(notes.length, 10).then(
            res => {
                if (res.data.notes.length === 0) {
                    notification.open({
                        message: '没有更多了😊！',
                    });
                } else {
                    onNotesChange(
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
        onNotesChange(filter(notes, note => note.id !== id));
    }

    return (
        <div className='flex justify-between'>
            {/* <FloatButton onClick={() => console.log('click')} type="primary" /> */}
            <div className='px-16 py-8 w-full h-screen overflow-scroll'>
                <Title>{title}</Title>
                {notesFilter(notes).length === 0 ? <Empty description={<Text className="text-gray-400">暂无笔记</Text>} className="w-full" /> :
                    <>
                        {notesFilter(notes).map(note => <NoteCard key={note.id} note={note} onDelete={handleDelete} onEdit={props.onEditNote} />)}
                        <div className="cursor-pointer w-full text-center text-gray-400" onClick={handleLoadMore}>点击这里，加载更多</div>
                    </>
                }
            </div>
            <div className='px-4 py-8 h-full'>
                <HeatMap
                    width={300}
                    value={heatMapValue}
                    style={{ color: '#ad001d' }}
                    startDate={dayjs().subtract(19, 'week').toDate()}
                    endDate={new Date()}
                    rectRender={(props, data) => {
                        return (
                            <Tooltip key={props.key} placement="top" title={`${data.date} 共 ${data.count || 0} 条 Note`}>
                                <rect {...props} onClick={()=>{
                                    console.log(data.date);
                                    setFilters([note => dayjs(note.create_date).isSame(data.date, 'day')]);
                                }}/>
                            </Tooltip>
                        );
                    }}
                />
                <Title className="mt-0" level={3}>🏷️ Tags</Title>
                <TagsList tags={props.tags} onClick={(tag) => {
                    setFilters([note => filter(note.tags, item => item.name.toLowerCase() === tag.name.toLocaleLowerCase()).length > 0]);
                    setTitle(tag.name);
                } } />
            </div>
        </div>
    );
};


export default Notes;