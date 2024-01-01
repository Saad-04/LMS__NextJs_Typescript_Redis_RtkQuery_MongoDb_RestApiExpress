'use client';
import CourseContent from '../../components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  //we accept params from courseDetail.tsx from component.course
  const id = params.id;
  const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find((item: any) => item._id === id);
      if (isPurchased) {
        redirect('/');
      }
    }
    if (error) {
      redirect('/');
    }
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* course content component  */}
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default Page;
