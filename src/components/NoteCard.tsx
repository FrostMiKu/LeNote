import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import { NoteType } from '../data/note';
import { delNote } from '../api/api';
import { Tag, Space, notification, Dropdown, MenuProps } from 'antd';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);

type NoteCardProps = {
    note: NoteType;
    onDelete?: (id: number) => void;
    onEdit?: (note: NoteType) => void;
    onDoubleClick?: (note: NoteType) => void;
}

//todo: 实现功能
const items: MenuProps['items'] = [
    {
      label: '编辑',
      key: 'edit',
    },
    {
      label: '删除',
      key: 'delete',
      danger: true,
    },
  ];

const NoteCard: React.FC<NoteCardProps> = (props: NoteCardProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const handleClick:MenuProps['onClick'] = ({key}) => {
        switch (key) {
            case 'delete':
                delNote(props.note.id).then(res=>{props.onDelete?props.onDelete(props.note.id):undefined;}).catch(err=>{
                    notification.open({message: '删除失败😭！'});
                    console.log(err);
                });
                break;
            case 'edit':
                props.onEdit?props.onEdit(props.note):undefined;
                break;
            default:
                console.log('default');
        }
    };
    useEffect(() => {
        if (contentRef.current === null) return;
        Vditor.preview(contentRef.current!, props.note.content);
    }, [props.note.content]);
    return (
        <div onDoubleClick={
            ()=>{
                props.onDoubleClick?props.onDoubleClick(props.note):undefined;
            }
        }
             className='bg-white shadow-md rounded-md px-8 py-4 mb-8'
        >
            <Dropdown menu={{ items, onClick:handleClick }} placement="bottom" arrow className='float-right'>
                <MoreOutlined className='cursor-pointer'/>
            </Dropdown>
            <div className='mb-2 text-gray-400'>{dayjs(props.note.create_date).locale('zh-cn').fromNow()}</div>
            <div className='vditor-reset' ref={contentRef} />
            <Space size={2} className='mt-4'>
                {props.note.tags.map(tag => <Tag key={tag.id} bordered={false} color={tag.color}>{tag.name}</Tag>)}
            </Space>
        </div>
    );
}

export default NoteCard;