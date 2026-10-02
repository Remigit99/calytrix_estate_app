import { createBrowserRouter, Navigate } from 'react-router';

// import DesignSystemPage from '../pages/public/DesignSystemPage';
import { PublicLayout } from '../components/layout';
import HomePage from '../pages/public/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import PropertiesPage from '../pages/public/PropertiesPage';
import PropertyDetailsPage from '../pages/public/PropertyDetailsPage';

const router = createBrowserRouter([
 {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/properties',
        element: <PropertiesPage/>
      },
         {
      path: '/properties/:id',
      element: <PropertyDetailsPage />,
    },

    ],
  },
        {
  path: '/login',
  element: <LoginPage />,
},
{
  path: '/register',
  element: <RegisterPage />,
},
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default router;