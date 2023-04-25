import { useState } from 'react'
import { Layout, theme } from "antd";
import MainMenu from './components/MainMenu'
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import NewNote from "./pages/NewNote";
import Vditor from 'vditor';
import { NoteType } from './data/note';

const { Sider, Content } = Layout;


function App() {
  const [page, setPage] = useState("notes");
  const [vd, setVd] = useState<Vditor>();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function switchPages(page: string) {
    switch (page) {
      case "notes":
        return <Notes notes={notes} onNotesChange={setNotes} />;
      case "settings":
        return <Settings />;
      case "newnote":
        return <NewNote content='' onLoging={(note)=>{setNotes([note,...notes])}}/>;
      default:
        return <Notes notes={notes} onNotesChange={setNotes} />;
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
