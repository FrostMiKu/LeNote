import { HeatMapValue } from "@uiw/react-heat-map";

export interface NoteType {
    id: number;
    content: string;
    tags: TagType[];
    create_date: Date|number;
}

export interface TagType {
    id: number;
    name: string;
    color: string;
}

export const MockTags: TagType[] = [
    {
        id: 4,
        name: 'Todo',
        color: 'red',
    },
    {
        id: 1,
        name: '天气',
        color: 'purple',
    },
    {
        id: 2,
        name: '心情',
        color: 'green',
    },
    {
        id: 3,
        name: '测试',
        color: 'blue',
    }
];

export const MockNotes: NoteType[] = [
    {
        id: 0,
        content: '## 本周的工作\n1. 写专利\n2. SVCC\n3. 处理赛道 2 数据\n4. 跑 RoLA\n## 笔记项目任务看板\n- 写后端\n- 实现删除\n- 实现过滤器\n- 实现模版\n- 实现设置',
        tags: [MockTags[0]],
        create_date: new Date(Date.now()),
    },
    {
        id: -1,
        content: '## 💡 简介\n[Vditor](https://b3log.org/vditor) 是一款浏览器端的 Markdown 编辑器，支持所见即所得（富文本）、即时渲染（类似 Typora）和分屏预览模式。它使用 TypeScript 实现，支持原生 JavaScript、Vue、React、Angular，提供[桌面版](https://b3log.org/siyuan)。',
        tags: [MockTags[3]],
        create_date: new Date(Date.now()-50000),
    },
    {
        id: -2,
        content: 'Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得（富文本）、即时渲染（类似 Typora）和分屏预览模式。它使用 TypeScript 实现，支持原生 JavaScript、Vue、React、Angular，提供桌面版。Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得（富文本）、即时渲染（类似 Typora）和分屏预览模式。它使用 TypeScript 实现，支持原生 JavaScript、Vue、React、Angular，提供桌面版。Vditor 是一款浏览器端的 Markdown 编辑器，支持所见即所得（富文本）、即时渲染（类似 Typora）和分屏预览模式。它使用 TypeScript 实现，支持原生 JavaScript、Vue、React、Angular，提供桌面版。',
        tags: [MockTags[3]],
        create_date: new Date(Date.now()-700000),
    },
    {
        id: -3,
        content: '- [ ] 今天天气不错',
        tags: MockTags.filter(x=>x.id!==3),
        create_date: new Date(Date.now()-5000000000),
    },
    {
        id: -4,
        content: '- [ ] 今天天气不错',
        tags: MockTags.filter(x=>x.id!==3),
        create_date: new Date(Date.now()-5000000000),
    }
];

export const MockHeatMapValues:HeatMapValue[] = [
    { date: '2023/01/11', count: 2, content: "test" },
    { date: '2023/04/12', count: 2, content: "test" },
    { date: '2023/05/01', count: 5, content: "test" },
    { date: '2023/05/02', count: 5, content: "test" },
    { date: '2023/05/03', count: 1, content: "test" },
    { date: '2023/05/04', count: 11, content: "test" },
    { date: '2023/05/08', count: 32, content: "test" },
];