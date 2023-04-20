import { useEffect, useRef, useState } from "react";
import { sortBy } from 'remeda'
import { Typography } from "antd";
import NoteCard from "../components/NoteCard";
import { MockNotes, MockHeatMapValues, NoteType } from '../data/note';
import HeatMap from '@uiw/react-heat-map';
import { getNotes } from "../api/note";

const { Title, Text } = Typography;

const Notes: React.FC = () => {
    const offset = useRef(0);
    // let offset = 0;
    const [loading, setLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('Notes');
    const [notes, setNotes] = useState<NoteType[]>([]);
    useEffect(() => {
        getNotes(offset.current,5).then(
            res => {
                setNotes(
                    sortBy(notes.concat(res.data.notes), [note => note.create_date, 'desc'])
                );
                offset.current = notes.length + res.data.notes.length;
                console.log(offset.current);
            });
    },[]);

    const handleLoadMore = () => {
        setLoading(true);
        getNotes(offset.current,5).then(
            res => {
                setNotes(
                    sortBy(notes.concat(res.data.notes), [note => note.create_date, 'desc'])
                );
                offset.current = notes.length + res.data.notes.length;
                console.log(offset.current);
                setLoading(false);
            });
    }

    return (
        <div className='flex justify-between'>
            <div className='px-16 py-8 w-full h-screen overflow-scroll'>
                <Title>{title}</Title>
                {notes.map(note => <NoteCard key={note.id} {...note} />)}
                <div className=" w-full text-center text-gray-400" onClick={handleLoadMore}>点击这里，加载更多</div>
            </div>
            <div className='px-4 py-8 h-full'>
                <HeatMap
                    width={300}
                    value={MockHeatMapValues}
                    style={{ color: '#ad001d' }}
                    startDate={new Date('2023/01/01')}
                    endDate={undefined}
                />
            </div>
        </div>
    );
};


export default Notes;