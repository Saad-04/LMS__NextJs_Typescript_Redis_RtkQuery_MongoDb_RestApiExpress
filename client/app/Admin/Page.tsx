'use client';
import React from 'react';
import Heading from '../utils/Heading';
import AdminSidebar from '../components/Admin/SideBar/AdminSideBar';
import AdminProtected from '../Hooks/AdminProtected';
import DashboardHero from '../components/Admin/DashBoardHero';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[10%] w-1/6">
            <AdminSidebar />
          </div>

          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
