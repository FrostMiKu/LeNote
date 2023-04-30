import { Menu } from 'antd';

type MenuProps = {
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
      {key: 'today', label: 'Today'},
      {key: 'tags', label: 'Tags'},
      {key: 'settings', label: 'Settings'},
    ]}/>
  );
};

export default MainMenu;
