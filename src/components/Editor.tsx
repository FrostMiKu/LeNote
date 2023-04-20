import "vditor/dist/index.css";
import {useRef,useEffect,useState} from "react";
import Vditor from "vditor";

interface EditorProps {
  setVd: (vd: Vditor) => void;
};

const Editor = (props: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (editorRef.current === null) return;
    const vditor = new Vditor(editorRef.current as HTMLElement, {
      after: () => {
        props.setVd(vditor);
      },
      cache : {id : "vditorCache"},
    });
  }, []);
  return <div ref={editorRef} className="vditor" />;
};

export default Editor;