import { Space, Tag } from "antd";
import { TagType } from "../data/note";

type TagsEditorProps = {
    tags: TagType[];
    clickable?: boolean;
    onClick?: (tag: TagType) => void;
    className?: string;
    closeable?: boolean;
    onClose?: (tag: TagType) => void;
}

const TagsList = (props: TagsEditorProps) => {
    return (
        <Space size={[2, 6]} className={props.className} wrap>
            {
                props.tags.map(
                    tag => <Tag
                        closable={props.closeable}
                        onClose={() => { props.onClose ? props.onClose(tag) : null }}
                        className={props.clickable ? "cursor-pointer" : undefined}
                        key={tag.id}
                        bordered={false}
                        color={tag.color}
                        onClick={() => { props.onClick ? props.onClick(tag) : undefined }}>
                        {tag.name}
                    </Tag>
                )
            }
        </Space>
    )
};

export default TagsList;