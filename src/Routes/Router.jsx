import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import DashboardLayout from '../Layouts/DashboardLayout';
import Profile from '../Pages/Dashboard/Profile';
import CreateDonation from '../Pages/Dashboard/Donor/CreateDonation';
import MyDonationRequests from '../Pages/Dashboard/Donor/MyDonationRequests';
import DashboardIndex from '../Pages/Dashboard/DashboardIndex';
import AllUsers from '../Pages/Dashboard/Admin/AllUsers';
import AllDonationRequests from '../Pages/Dashboard/Admin/AllDonationRequests';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/login', element: <Login /> },
      {
        path: '/register',
        element: <Register />,
        loader: () => fetch('/district.json').then((res) => res.json()),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'create-donation-request',
        element: <CreateDonation />,
      },
      {
        path: 'my-donation-requests',
        element: <MyDonationRequests />,
      },
      {
        path: 'all-users',
        element: <AllUsers />,
      },
      {
        path: 'all-blood-donation-request',
        element: <AllDonationRequests />,
      },
    ],
  },
]);

export default router;
