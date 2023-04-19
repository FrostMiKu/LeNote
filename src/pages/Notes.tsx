import { Typography } from "antd";
import NoteCard from "../components/NoteCard";
import { MockNotes, MockHeatMapValues, NoteType } from '../data/note';
import HeatMap from '@uiw/react-heat-map';
import { useEffect, useState } from "react";
import { getNotes } from "../api/note";

const { Title, Text } = Typography;

const Notes: React.FC = () => {
    const [title, setTitle] = useState<string>('Notes');
    const [notes, setNotes] = useState<NoteType[]>(MockNotes);
    useEffect(() => {getNotes().then(res => {setNotes(notes.concat(res.notes));});},[]);
    return (
        <div className='flex justify-between'>
            <div className='px-16 py-8 w-full h-screen overflow-scroll'>
                <Title>{title}</Title>
                {notes.map(note => <NoteCard key={note.id} {...note} />)}
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