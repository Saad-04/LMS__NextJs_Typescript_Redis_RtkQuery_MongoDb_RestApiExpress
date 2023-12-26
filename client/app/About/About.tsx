import React, { useEffect, useState } from 'react';
import { styles } from '../Styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layouts/layoutApi';
import Loader from '../components/Loader/Loader';

const About = () => {
  const { data, refetch, isLoading, isSuccess } = useGetHeroDataQuery('about', {});
  const [about, setAbout] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setAbout(data.layout?.about);
      refetch();
    }
  }, [data, refetch]);

  return (
    <div className="text-black dark:text-white">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        What is <span className="text-gradient">Becodemy?</span>
      </h1>

      <br />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[95%] 800px:w-[85%] m-auto">
          {about &&
            about.map((about) => {
              return (
                <>
                  <p className="text-[18px] font-Poppins">
                    {about.title}
                    <br />
                    <br />
                  </p>
                </>
              );
            })}

          {/* <span className="text-[22px]">Shahriarsajeeb&apos;s</span>
        <h5 className="text-[18px] font-Poppins">Founder and CEO of Becodemy</h5> */}
          <br />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default About;
