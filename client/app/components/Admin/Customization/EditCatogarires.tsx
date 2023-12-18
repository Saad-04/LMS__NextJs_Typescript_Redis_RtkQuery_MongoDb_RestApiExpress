import { useEditLayoutMutation, useGetHeroDataQuery } from '../../../../redux/features/layouts/layoutApi';
import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import { styles } from '../../../Styles/style';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { toast } from 'react-hot-toast';

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery('category', {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
  const [category, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.category);
    }
    if (layoutSuccess) {
      refetch();
      toast.success('Categories updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);
  // when input field change then show this function work
  const handleCategoriesAdd = (id: any, value: string, index: number) => {
    setCategories((prevCategory: any) => prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i)));
  };

  const newCategoriesHandler = () => {
    if (category[category.length - 1].title === '') {
      toast.error('Category title cannot be empty');
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: '' }]);
    }
  };

  const areCategoriesUnchanged = (originalCategories: any[], newCategories: any[]) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === '');
  };

  const editCategoriesHandler = async () => {
    if (!areCategoriesUnchanged(data.layout.category, category) && !isAnyCategoryTitleEmpty(category)) {
      await editLayout({
        type: 'category',
        category,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${styles.title}`}>All Categories</h1>
          {category &&
            category.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      // here we send three things when function call
                      onChange={(e) => handleCategoriesAdd(item._id, e.target.value, index)}
                      placeholder="Enter category title..."
                    />
                    <AiOutlineDelete
                      className="dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) => prevCategory.filter((i: any) => i._id !== item._id));
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
              onClick={newCategoriesHandler}
            />
          </div>

          {/* save button 👇 */}
          <div
            className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${
              areCategoriesUnchanged(data.layout.category, category) || isAnyCategoryTitleEmpty(category)
                ? '!cursor-not-allowed'
                : '!cursor-pointer !bg-[#42d383]'
            }
            !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout.category, category) || isAnyCategoryTitleEmpty(category)
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

export default EditCategories;
