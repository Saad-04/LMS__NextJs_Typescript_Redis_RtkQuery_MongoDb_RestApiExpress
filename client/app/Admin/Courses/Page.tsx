'use client';
import DashboardHero from '../../components/Admin/DashBoardHero';
import AdminProtected from '../../Hooks/AdminProtected';
import Heading from '@/app/utils/Heading';
import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/Admin/SideBar/AdminSideBar';
import AllCourses from '../../components/Admin/Course/AllCourses';

type Props = {};

const Page = (props: Props) => {
  const [activeRefreshCourses, setActiveRefreshCoursess] = useState<boolean>(false);

  useEffect(() => {
    setActiveRefreshCoursess(true);
  }, []);
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero activeRefreshCourses={activeRefreshCourses} />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
