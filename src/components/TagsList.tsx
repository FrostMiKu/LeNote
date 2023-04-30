import { Space, Tag } from "antd";
import { TagType } from "../data/note";

type TagsEditorProps = {
    tags: TagType[];
    onClick?: (tag: TagType) => void;
}

const TagsList = (props: TagsEditorProps) => {
    return (
        <Space size={[2,6]} wrap>
            {props.tags.map(tag => <Tag className="cursor-pointer" key={tag.id} bordered={false} color={tag.color} onClick={()=>{props.onClick?props.onClick(tag):undefined}}>{tag.name}</Tag>)}
        </Space>
    )
};

export default TagsList;