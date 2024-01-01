import { useGetSingleCourseQuery } from '../../../redux/features/courses/courseApi';
import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from './CourseContentMedia';
import Header from '../Header';
import CourseContentList from './CourseContentList';

type Props = {
  id: string;
  user: any;
};

const CourseContent = ({ id, user }: Props) => {
  const { data: contentData, isLoading, refetch } = useGetSingleCourseQuery(id, { refetchOnMountOrArgChange: true });
  //
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login');
  const courseData = contentData?.course?.courseData; //first we get course data

  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title=""
              // {courseData[activeVideo]?.title}
              description="anything"
              keywords=""
              // {courseData[activeVideo]?.tags}
            />
            <div className="col-span-7">
              <CourseContentMedia
                data={courseData}
                id={id}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                user={user}
                refetch={refetch}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList
                setActiveVideo={setActiveVideo}
                data={contentData?.course?.courseData}
                activeVideo={activeVideo}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
