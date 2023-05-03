import { useEffect, useState } from 'react'
import { Layout, theme } from "antd";
import MainMenu from './components/MainMenu'
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import EditNote from "./pages/EditNote";
import { NoteType, TagType } from './data/note';
import { getTags } from './api/api';

const { Sider, Content } = Layout;


function App() {
  const [page, setPage] = useState("notes");
  const [tags, setTags] = useState<TagType[]>([]);
  const [editNote, setEditNote] = useState<NoteType>();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    getTags().then((res) => {
      setTags(res.data.tags);      
    });
  }, [page]);

  const handleEditNote = (note: NoteType) => {
    setEditNote(note);
    setPage("editnote");
  }

  function switchPages(page: string) {
    switch (page) {
      case "notes":
        return <Notes tags={tags} onEditNote={handleEditNote} onNewNote={()=>setPage("newnote")} />;
      case "settings":
        return <Settings />;
      case "newnote":
        return <EditNote tags={tags} onLoging={()=>{setPage('notes')}}/>;
      case "editnote":
        return <EditNote tags={tags} onLoging={()=>{setPage('notes')}} note={editNote} update />;
      case "tags":
      default:
        return <Settings />; // aka todo...
    }
  }

  return (
    <Layout className=' h-screen'>
      <Sider className='bg-gray-200' width={240} style={{background: colorBgContainer}}>
        <h1 className=' text-xl w-60 h-10 my-2 py-2 text-center'>📔 LeNote</h1>
        <MainMenu fn={setPage} />
      </Sider>
      <Content>
        {
          switchPages(page)
        }
      </Content>
    </Layout>
  )
}

export default App
