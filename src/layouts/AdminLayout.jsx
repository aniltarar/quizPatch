import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminSidebar from '~/components/Admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
     <AdminSidebar/>
      
      <main className="flex-grow bg-zinc-50 p-5">
        <Outlet />
      </main>
      <ToastContainer/>
    </div>
  );
};

export default AdminLayout;
