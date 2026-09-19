import { createBrowserRouter, Navigate } from 'react-router';

import DesignSystemPage from '../pages/public/DesignSystemPage';
import { PublicLayout } from '../components/layout';

const router = createBrowserRouter([
 {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <DesignSystemPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;