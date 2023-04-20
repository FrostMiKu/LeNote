import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import { NoteType } from '../data/note';
import { Tag, Space, Button, Dropdown, MenuProps } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);

//todo: 实现功能
const items: MenuProps['items'] = [
    {
      label: '编辑',
      key: '1',
    },
    {
      label: '删除',
      key: '2',
    },
  ];

const NoteCard: React.FC<NoteType> = (props: NoteType) => {
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (contentRef.current === null) return;
        Vditor.preview(contentRef.current!, props.content);
    }, [props.content]);
    return (
        <div className='bg-white shadow-md rounded-md px-8 py-4 mb-8'>
            <Dropdown menu={{ items }} placement="bottom" arrow className='float-right'>
                <MoreOutlined className='cursor-pointer'/>
            </Dropdown>
            <div className='mb-2 text-gray-400'>{dayjs(props.create_date).locale('zh-cn').fromNow()}</div>
            <div className='vditor-reset' ref={contentRef} />
            <Space size={2} className='mt-4'>
                {props.tags.map(tag => <Tag key={tag.id} bordered={false} color={tag.color}>{tag.name}</Tag>)}
            </Space>
        </div>
    );
}

export default NoteCard;