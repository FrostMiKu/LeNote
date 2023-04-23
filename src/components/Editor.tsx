import "vditor/dist/index.css";
import { useRef, useEffect, useState } from "react";
import Vditor from "vditor";
import { TagType } from "../data/note";
import { Button } from "antd";
import Tags from "./Tags";

interface EditorProps {
  tags: TagType[];
  content?: string;
  setTags: (tags: TagType[]) => void;
  setVd: (vd: Vditor) => void;
  onLoging: () => void;
};

const Editor = (props: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorRef.current === null) return;
    const vditor = new Vditor(editorRef.current as HTMLElement, {
      after: () => {
        props.setVd(vditor);
        if (props.content) {
          vditor.setValue(props.content);
        }
      },
      cache: { id: "vditorCache" },
      height: 'calc(100% - 3rem)',
    });
  }, []);
  return (
    <div className="h-3/4 p-8 shadow-md rounded-md bg-white">
      <div ref={editorRef} className="vditor" />
      <div className="flex justify-between items-center mt-4">
        <Tags tags={props.tags} setTags={props.setTags} />
        <Button type="primary" onClick={props.onLoging}>✍🏼 Loging!</Button>
      </div>
    </div>
  );
};

export default Editor;