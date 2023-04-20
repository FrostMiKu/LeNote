import "vditor/dist/index.css";
import {useRef,useEffect,useState} from "react";
import Vditor from "vditor";

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
};

const Editor = (props: EditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [vd, setVd] = useState<Vditor>();
  useEffect(() => {
    if (editorRef.current === null) return;
    const vditor = new Vditor(editorRef.current as HTMLElement, {
      after: () => {
        vditor.setValue(props.content);
        setVd(vditor);
      },
      input(value) {
        props.setContent(value);
      },
      "cache": {
        "id": "vditorCache"
      }
    });
  }, []);
  useEffect(() => {vd?.setValue(props.content)},[vd,props.content]);
  return <div ref={editorRef} className="vditor" />;
};

export default Editor;