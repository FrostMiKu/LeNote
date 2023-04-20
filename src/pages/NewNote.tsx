import { useState } from "react";
import Editor from "../components/Editor";
import Tags from "../components/Tags";
import { Button, Space, Typography, notification } from "antd";
import { TagType, MockTags } from "../data/note";
import { addNote } from "../api/note";
import {  } from "remeda"

const { Title } = Typography;

interface NewNoteProps {
    title?: string;
    content: string;
    tags?: TagType[];
}
const openNotification = (code:number) => {
    switch (code) {
        case 0:
            notification.open({
                message: '保存成功😊！',
                description:
                  '您的笔记已经保存成功！',
            });
            break;
        case -1:
            notification.open({
                message: '你在干什么？😅',
                description:
                    '你还什么都没有写呢！',
            });
            break;
        default:
            notification.open({
                message: '保存失败😭！',
                description:
                  '您的笔记未能成功保存！',
            });
    }
};

const NewNote = (props: NewNoteProps) => {
    const [content, setContent] = useState<string>(props.content);
    const [tags, setTags] = useState<TagType[]>(props.tags ? props.tags : MockTags);

    const handleClick = () => {
        if (content.trim().length === 0) {
            openNotification(-1);
            return;
        }
        addNote({id:0,content:content,create_date:Date.now(),tags:tags}).then(
            res => {
                openNotification(res.code);
                if (res.code === 0) {
                    setContent("");
                    setTags([]);
                }
            }
        ).catch(_=>openNotification(-2));
    }
    return (
        <div className="px-16 py-8">
            <Title>{props.title? props.title:"New Note"}</Title>
            <div className="p-8 shadow-md rounded-md bg-white">
                <Editor content={content} setContent={setContent} />
                <div className="flex justify-between items-center mt-4">
                    <Tags tags={tags} setTags={setTags}/>
                    <Button type="primary" onClick={handleClick}>Loging!</Button>
                </div>
            </div>
        </div>
    );
}

export default NewNote;