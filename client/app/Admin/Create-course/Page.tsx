'use client';
import React, { useState } from 'react';
import AdminSidebar from '../../components/Admin/SideBar/AdminSideBar';
import Heading from '../../../app/utils/Heading';
import DashboardHeader from '@/app/components/Admin/DashBoardHeader';
import CreateCourse from '@/app/components/Admin/Course/CreateCourse';

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          {/* this is admin sidebar  */}
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          {/* this is admin header section notification things etc  */}
          <DashboardHeader open={open} setOpen={setOpen} />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
