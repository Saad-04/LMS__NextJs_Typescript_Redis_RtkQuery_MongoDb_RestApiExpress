import { useEditLayoutMutation, useGetHeroDataQuery } from '../../../../redux/features/layouts/layoutApi';
import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import { styles } from '../../../Styles/style';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { SettingsBackupRestore } from '@mui/icons-material';

type Props = {};

const EditAbout = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery('about', {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
  const [about, setAbout] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setAbout(data.layout.about);
    }
    if (layoutSuccess) {
      refetch();
      toast.success('About updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);
  // when input field change then show this function work
  const handleAboutAdd = (id: any, value: string, index: number) => {
    setAbout((prevAbout: any) => prevAbout.map((i: any) => (i._id === id ? { ...i, title: value } : i)));
  };

  const newAboutHandler = () => {
    if (about[about.length - 1].title === '') {
      toast.error('Category title cannot be empty');
    } else {
      setAbout((prevAbout: any) => [...prevAbout, { title: '' }]);
    }
  };

  const areAboutUnchanged = (originalAbout: any[], newAbout: any[]) => {
    return JSON.stringify(originalAbout) === JSON.stringify(newAbout);
  };

  const isAnyAboutTitleEmpty = (about: any[]) => {
    return about.some((q) => q.title === '');
  };

  const editCategoriesHandler = async () => {
    if (!areAboutUnchanged(data.layout.about, about) && !isAnyAboutTitleEmpty(about)) {
      await editLayout({
        type: 'about',
        about,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center ">
          <h1 className={`${styles.title} text-gradient`}> Customize About</h1>
          {about &&
            about.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    {/* <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      // here we send three things when function call
                      onChange={(e) => handleAboutAdd(item._id, e.target.value, index)}
                      placeholder="Enter category title..."
                    /> */}
                    <textarea
                      name=""
                      id=""
                      cols="100"
                      rows="6"
                      className={` !w-[unset] dark:bg-gray-800 text-gray-100 p-3 !text-[20px]`}
                      value={item.title}
                      // here we send three things when function call
                      onChange={(e) => handleAboutAdd(item._id, e.target.value, index)}
                      placeholder="Enter category title..."></textarea>
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setAbout((prevAbout: any) => prevAbout.filter((i: any) => i._id !== item._id));
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />

          {/* plus icons for add more title 👇  */}
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newAboutHandler}
            />
          </div>

          {/* save button 👇 */}
          <div
            className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${
              areAboutUnchanged(data.layout.about, about) || isAnyAboutTitleEmpty(about)
                ? '!cursor-not-allowed'
                : '!cursor-pointer !bg-[#42d383]'
            }
            !rounded absolute bottom-12 right-12`}
            onClick={
              areAboutUnchanged(data.layout.about, about) || isAnyAboutTitleEmpty(about)
                ? () => null
                : editCategoriesHandler
            }>
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditAbout;
