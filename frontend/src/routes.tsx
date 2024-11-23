import { createBrowserRouter } from 'react-router-dom';
import Search from './pages/Search';
import Home from './pages/Home';
import Students from './pages/Students';
import Clubs from './pages/Clubs';

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
    path: '/clubs',
    element: <Clubs />,
  },
]);

export default router;
