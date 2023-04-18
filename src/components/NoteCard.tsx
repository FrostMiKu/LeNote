import React, { useEffect, useRef } from 'react';
import Vditor from 'vditor';
import { NoteType } from '../data/note';
import { Tag, Space } from 'antd';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.extend(relativeTime);


const NoteCard: React.FC<NoteType> = (props: NoteType) => {
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (contentRef.current === null) return;
        console.log(props.id);
        Vditor.preview(contentRef.current!, props.markdown);
    }, [props.markdown]);
    return (
        <div className='bg-white shadow-md rounded-md px-8 py-4 mb-8'>
            <div className='mb-2 text-gray-400'>{dayjs(props.date).locale('zh-cn').fromNow()}</div>
            <div className='vditor-reset' ref={contentRef} />
            <Space size={2} className='mt-4'>
                {props.tags.map(tag => <Tag key={tag.id} bordered={false} color={tag.color}>{tag.name}</Tag>)}
            </Space>
        </div>
    );
}

export default NoteCard;