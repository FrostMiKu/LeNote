import "vditor/dist/index.css";
import { useRef, useEffect, useState } from "react";
import Vditor from "vditor";
import { NoteType, TagType } from "../data/note";
import { Button } from "antd";
import Tags from "./TagsEditor";

type EditorProps = {
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
      mode: "ir",
      placeholder: "写点啥呢 🤔",
      cache: { id: props.note.id.toString() },
      height: 'calc(100% - 3rem)',
      toolbar: [
        "emoji",
        "headings",
        "bold",
        "italic",
        "strike",
        "link",
        "|",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        "upload",
        "table",
        "|",
        "undo",
        "redo",
        "|",
        "fullscreen",
        "edit-mode",
        {
            name: "more",
            toolbar: [
                "both",
                "code-theme",
                "content-theme",
                "export",
                "outline",
                "preview",
                "devtools",
            ]
        },
      ],
      upload: {
        accept: 'image/*, .mp3, .wav, .rar, .zip, .pdf',
        // url: "/upload/editor",
        url: "http://localhost:8000/upload/editor",
        // linkToImgUrl: 'http://localhost:8000/upload/fetch',
        filename (name) {
          return name
            .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
            .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
            .replace('/\\s/g', '')
        },
      }
    });
  }, []);
  const setTags = (tags: TagType[]) => {
    props.setNote({...props.note, tags: tags});
  }
  return (
    <div className="h-3/4 p-8 shadow-md rounded-md bg-white">
      <div ref={editorRef} className="vditor" />
      <div className="flex justify-between items-center mt-4">
        <Tags tags={props.note.tags} all_tags={props.tags} setTags={setTags} canAdd />
        <Button type="primary" onClick={props.onClick}>✍🏼 Loging!</Button>
      </div>
    </div>
  );
};

export default Editor;