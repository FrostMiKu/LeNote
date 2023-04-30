import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, InputRef } from 'antd';
import { Space, Tag, theme } from 'antd';
import { TagType } from '../data/note';
import { objOf, uniqBy } from 'remeda';

type TagsEditorProps = {
    tags: TagType[];
    setTags: (tags: TagType[]) => void;
    all_tags?: TagType[];
    canAdd?: boolean;
}

// 随机生成颜色, todo: 用户直接设置颜色
const randomColor = () => {
    const colors = [
        "magenta",
        "red",
        "volcano",
        "orange",
        "gold",
        "lime",
        "green",
        "cyan",
        "blue",
        "geekblue",
        "purple"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

const Tags: React.FC<TagsEditorProps> = (props: TagsEditorProps) => {
    const { token } = theme.useToken();
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<InputRef>(null);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    const handleClose = (removedTag: TagType) => {
        const newTags = props.tags.filter((tag) => tag.name !== removedTag.name);
        props.setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (value:string) => {
        setInputValue(value);
    };

    const mockID = useRef(0); // id 由后端生成，新标签的 id 由前端 mock，除了显示没啥用
    const handleInputConfirm = () => {
        if (inputValue) {
            props.setTags(
                uniqBy([...props.tags, { id: mockID.current, name: inputValue, color: randomColor() }], tag => tag.name)
            );
        }
        setInputVisible(false);
        setInputValue('');
        mockID.current--;
    };

    const tagPlusStyle: React.CSSProperties = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };

    const options = (props.all_tags ?? []).map(tag => objOf(tag.name, 'value'));
    return (
        <div>
            <Space size={[0, 8]} wrap>
                <div>
                    {props.tags.map(
                        tag => <Tag key={tag.id} bordered={false} color={tag.color} closable onClose={() => { handleClose(tag) }}>{tag.name}</Tag>
                    )
                    }
                </div>
                {props.tags.length < 8 && props.canAdd ? //最多8个标签，前端限制
                    <div>
                        {inputVisible ? (
                            <AutoComplete
                                options={options}
                                style={{ width: 200 }}
                                onChange={handleInputChange}
                                onSelect={handleInputChange}
                                onBlur={ handleInputConfirm }
                                // onSearch={(text) => setOptions(getPanelValue(text))}
                                placeholder="新标签"
                            />
                        ) : (
                            <Tag style={tagPlusStyle} onClick={showInput}>
                                <PlusOutlined /> 新标签
                            </Tag>
                        )}
                    </div> : null
                }
            </Space>
        </div>
    )
}

export default Tags;