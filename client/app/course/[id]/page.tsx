'use client';
import React from 'react';
import CourseDetailsPage from '../../components/Course/CourseDetailPage';

const Page = ({ params }: any) => {
  // we receive this params.id from components/course/courseCard
  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  );
};

export default Page;
