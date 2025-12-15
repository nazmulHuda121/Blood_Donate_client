import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import DashboardLayout from '../Layouts/DashboardLayout';
import Profile from '../Pages/Dashboard/Profile';
import DashboardHome from '../Pages/Dashboard/DashboardHome';
import CreateDonation from '../Pages/Dashboard/Donor/CreateDonation';
import MyDonationRequests from '../Pages/Dashboard/Donor/MyDonationRequests';

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
    element: <DashboardLayout />,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'create-donation-request', element: <CreateDonation /> },
      { path: 'my-donation-requests', element: <MyDonationRequests /> },
    ],
  },
]);

export default router;
