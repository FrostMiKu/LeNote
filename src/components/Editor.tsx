import "vditor/dist/index.css";
import { useRef, useEffect, useState } from "react";
import Vditor from "vditor";
import { NoteType, TagType } from "../data/note";
import { Button } from "antd";
import Tags from "./TagsEditor";

interface EditorProps {
  note: NoteType;
  tags?: TagType[];
  setNote: (note: NoteType) => void;
  setVd: (vd: Vditor) => void;
  onClick: () => void;
};

const Editor = (props: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorRef.current === null) return;
    const vditor = new Vditor(editorRef.current as HTMLElement, {
      after: () => {
        props.setVd(vditor);
        vditor.setValue(props.note.content);
      },
      cache: { id: props.note.id.toString() },
      height: 'calc(100% - 3rem)',
    });
  }, []);
  const setTags = (tags: TagType[]) => {
    props.setNote({...props.note, tags: tags});
  }
  return (
    <div className="h-3/4 p-8 shadow-md rounded-md bg-white">
      <div ref={editorRef} className="vditor" />
      <div className="flex justify-between items-center mt-4">
        <Tags tags={props.note.tags} all_tags={props.tags} setTags={setTags} />
        <Button type="primary" onClick={props.onClick}>✍🏼 Loging!</Button>
      </div>
    </div>
  );
};

export default Editor;