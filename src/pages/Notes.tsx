import { Typography } from "antd";
import NoteCard from "../components/NoteCard";
import { MockNotes, MockHeatMapValues } from '../data/note';
import HeatMap from '@uiw/react-heat-map';
import { useState } from "react";

const { Title, Text } = Typography;

const Notes: React.FC = () => {
    const [title, setTitle] = useState<string>('Notes');
    return (
        <div className='flex justify-between'>
            <div className='px-16 py-8 w-full h-screen overflow-scroll'>
                <Title>{title}</Title>
                {MockNotes.map(note => <NoteCard key={note.id} {...note} />)}
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