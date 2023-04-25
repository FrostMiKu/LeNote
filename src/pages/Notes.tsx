import { useEffect, useState } from "react";
import { sortBy, filter } from 'remeda'
import { Typography, notification, Empty, Button, Tooltip } from "antd";
import NoteCard from "../components/NoteCard";
import { NoteType } from '../data/note';
import HeatMap from '@uiw/react-heat-map';
import { getNotes } from "../api/note";
import { notes2HeatmapData } from "../utils";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface NotesProps {
    notes: NoteType[];
    onNotesChange: (notes: NoteType[]) => void;
}

const Notes: React.FC<NotesProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('📔 Notes');
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

    const handleLoadMore = () => {
        setLoading(true);
        console.log(notes.length);

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
            <div className='px-16 py-8 w-full h-screen overflow-scroll'>
                <Title>{title}</Title>
                {notes.length === 0 ? <Empty description={<Text className="text-gray-400">暂无笔记</Text>} className="w-full" /> :
                    <>
                        {notes.map(note => <NoteCard key={note.id} note={note} onDelete={handleDelete} />)}
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
                        return (
                            <Tooltip key={props.key} placement="top" title={`${data.date} 共 ${data.count || 0} 条 Note`}>
                                <rect {...props} />
                            </Tooltip>
                        );
                    }}
                />
                <Button type="primary" className="mt-4" onClick={() => {
                    onNotesChange(
                        filter(notes, note => filter(note.tags, tag => tag.name.toLowerCase() === 'todo').length > 0)
                    );
                    setTitle('Todo');
                }}>Todo</Button>
            </div>
        </div>
    );
};


export default Notes;