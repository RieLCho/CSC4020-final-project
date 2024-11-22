import { createBrowserRouter } from 'react-router-dom';
import Search from './pages/Search';
import Home from './pages/Home';

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
]);

export default router;
