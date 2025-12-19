import React from 'react';
import Navbar from '../Pages/Shared/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';

const MainLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
