import { useEffect, useRef, useState } from "react";
import { sortBy, filter } from 'remeda'
import { Typography, notification, Empty, Button, Tooltip } from "antd";
import NoteCard from "../components/NoteCard";
import { MockNotes, MockHeatMapValues, NoteType, TagType } from '../data/note';
import HeatMap from '@uiw/react-heat-map';
import { getNotes } from "../api/note";
import { notes2HeatmapData } from "../utils";
import dayjs from "dayjs";
import Editor from "../components/Editor";
import Vditor from "vditor";

const { Title, Text } = Typography;

const Notes: React.FC = () => {
    const offset = useRef(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('📔 Notes');
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [vd, setVd] = useState<Vditor>();
    const [editNote, setEditNote] = useState<NoteType | undefined>(undefined);
    useEffect(() => {
        getNotes(offset.current, 10).then(
            res => {
                setNotes(
                    sortBy(notes.concat(res.data.notes), [note => note.create_date, 'desc'])
                );
                offset.current = notes.length + res.data.notes.length;
                // console.log(offset.current);
            });
    }, []);

    const handleLoadMore = () => {
        setLoading(true);
        getNotes(offset.current, 10).then(
            res => {
                if (res.data.notes.length === 0) {
                    notification.open({
                        message: '没有更多了😊！',
                    });
                } else {
                    setNotes(
                        sortBy(notes.concat(res.data.notes), [note => note.create_date, 'desc'])
                    );
                    offset.current = notes.length + res.data.notes.length;
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

    const handleEdit = (note: NoteType) => {
        setEdit(true);
        setEditNote(note);
        setTitle('📝 编辑笔记');
        vd?.setValue(note.content);
    }

    const handleSetTags = (tags: TagType[]) => {
        if (editNote !== undefined) {
            setEditNote({ ...editNote, tags: tags });
        }
    }

    const handleLogging = () => {
        if (editNote !== undefined) {
            setEditNote({...editNote, content: vd?.getValue()!})
        }
        setEdit(false);
        setTitle('📔 Notes');
        // setEditNote(undefined);
    }

    return (
        <div className='flex justify-between'>
            <div className='px-16 py-8 w-full h-screen overflow-scroll'>
                <Title>{title}</Title>
                {notes.length === 0 ? <Empty description={<Text className="text-gray-400">暂无笔记</Text>} className="w-full" /> :
                    <>
                        {notes.map(note => <NoteCard key={note.id} note={note} onDelete={handleDelete} onEdit={handleEdit} />)}
                        <div className="cursor-pointer w-full text-center text-gray-400" onClick={handleLoadMore}>点击这里，加载更多</div>
                    </>
                }
            </div>
            <div className='px-4 py-8 h-full'>
                <HeatMap
                    width={300}
                    value={notes2HeatmapData(notes)}
                    style={{ color: '#ad001d' }}
                    startDate={dayjs().subtract(19, 'week').toDate()}
                    endDate={new Date()}
                    rectRender={(props, data) => {
                        // if (!data.count) return <rect {...props} />;
                        return (
                            <Tooltip key={props.key} placement="top" title={`${data.date} 共 ${data.count || 0} 条 Note`}>
                                <rect {...props} />
                            </Tooltip>
                        );
                    }}
                />
                <Button type="primary" className="mt-4" onClick={() => {
                    setNotes(
                        filter(notes, note => filter(note.tags, tag => tag.name.toLowerCase() === 'todo').length > 0)
                    );
                    setTitle('Todo');
                }}>Todo</Button>
            </div>
        </div>
    );
};


export default Notes;