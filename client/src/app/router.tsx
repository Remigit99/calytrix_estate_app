import { createBrowserRouter, Navigate } from 'react-router';

// import DesignSystemPage from '../pages/public/DesignSystemPage';
import { PublicLayout } from '../components/layout';
import HomePage from '../pages/public/HomePage';

const router = createBrowserRouter([
 {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;