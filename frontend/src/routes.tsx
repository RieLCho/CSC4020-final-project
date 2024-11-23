import { createBrowserRouter } from 'react-router-dom';
import Search from './pages/Search';
import Home from './pages/Home';
import Students from './pages/Students';
import MyInfo from './pages/MyInfo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    index: true,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/students',
    element: <Students />,
  },
  {
    path: '/myinfo',
    element: <MyInfo />,
  },
]);

export default router;
