import { createBrowserRouter, Navigate } from 'react-router';

import DesignSystemPage from '../pages/public/DesignSystemPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DesignSystemPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;