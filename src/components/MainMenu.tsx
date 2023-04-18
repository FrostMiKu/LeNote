import { Menu } from 'antd';

interface MenuProps {
  fn: (key: string) => void;
}

const MainMenu = (props: MenuProps) => {
  const {fn} = props;
  const handleClick = (e: any) => {
    const { item, key, keyPath, domEvent } = e;
    fn(key);
  }
  return (
    <Menu onClick={handleClick} defaultSelectedKeys={['overview']} items={[
      {key: 'notes', label: 'Notes'},
      {key: 'newnote', label: 'New'},
      {key: 'settings', label: 'Settings'},
    ]}/>
  );
};

export default MainMenu;
