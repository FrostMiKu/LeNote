import "vditor/dist/index.css";
import React from "react";
import Vditor from "vditor";

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
};

const Editor = (props: EditorProps) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [vd, setVd] = React.useState<Vditor>();
  React.useEffect(() => {
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
  return <div ref={editorRef} className="vditor" />;
};

export default Editor;