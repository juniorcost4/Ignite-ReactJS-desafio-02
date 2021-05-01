import { Content } from './components/Content';
import { SideBar } from './components/SideBar';

import './styles/global.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export const App = () => {
  return (
    <>
      <SideBar />
      <Content />
    </>
  );
}