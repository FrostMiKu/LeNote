import { useState } from "react";
import Editor from "../components/Editor";
import Tags from "../components/Tags";
import { Button, Space, Typography } from "antd";
import { TagType } from "../data/note";

const { Title } = Typography;

interface NewNoteProps {
    title?: string;
    content: string;
    tags?: TagType[];
}

const NewNote = (props: NewNoteProps) => {
    const [content, setContent] = useState<string>(props.content);
    return (
        <div className="px-16 py-8">
            <Title>{props.title? props.title:"New Note"}</Title>
            <div className="p-8 shadow-md rounded-md bg-white">
                <Editor content={content} setContent={setContent} />
                <Space align="baseline" className="mt-4">
                    <Tags />
                    <Button type="primary" onClick={() => { }}>Save</Button>
                </Space>
            </div>
        </div>
    );
}

export default NewNote;