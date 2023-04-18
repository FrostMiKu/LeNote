import { useState } from 'react'
import { Layout, theme } from "antd";
import MainMenu from './components/MainMenu'
import Notes from "./pages/Notes";
import Settings from "./pages/Settings";
import NewNote from "./pages/NewNote";

const { Sider, Content } = Layout;

function switchPages(page: string) {
  switch (page) {
    case "notes":
      return <Notes />;
    case "settings":
      return <Settings />;
    case "newnote":
      return <NewNote content=''/>;
    default:
      return <Notes />;
  }
}

function App() {
  const [page, setPage] = useState("notes");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className=' h-screen'>
      <Sider className='bg-gray-200' width={240} style={{background: colorBgContainer}}>
        <h1 className=' text-xl w-60 h-10 my-2 py-2 text-center'>LeNote</h1>
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
