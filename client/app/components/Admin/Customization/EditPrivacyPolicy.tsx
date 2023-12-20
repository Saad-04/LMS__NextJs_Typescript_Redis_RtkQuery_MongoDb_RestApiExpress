import { useEditLayoutMutation, useGetHeroDataQuery } from '../../../../redux/features/layouts/layoutApi';
import React, { useEffect, useState } from 'react';
import Loader from '../../Loader/Loader';
import { styles } from '../../../Styles/style';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { SettingsBackupRestore } from '@mui/icons-material';

type Props = {};

const EditPrivacyPolicy = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery('privacyPolicy', {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] = useEditLayoutMutation();
  const [privacyPolicy, setPrivacyPolicy] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setPrivacyPolicy(data.layout.privacyPolicy);
    }
    if (layoutSuccess) {
      refetch();
      toast.success('privacyPolicy updated successfully');
    }

    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);
  // when input field change then show this function work
  const handleprivacyPolicyAdd = (id: any, value: string, index: number) => {
    setPrivacyPolicy((prevPrivacyPolicy: any) =>
      prevPrivacyPolicy.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newprivacyPolicyHandler = () => {
    if (privacyPolicy[privacyPolicy.length - 1].title === '') {
      toast.error('Category title cannot be empty');
    } else {
      setPrivacyPolicy((prevPrivacyPolicy: any) => [...prevPrivacyPolicy, { title: '' }]);
    }
  };

  const areprivacyPolicyUnchanged = (originalPrivacyPolicy: any[], newPrivacyPolicy: any[]) => {
    return JSON.stringify(originalPrivacyPolicy) === JSON.stringify(newPrivacyPolicy);
  };

  const isAnyprivacyPolicyTitleEmpty = (privacyPolicy: any[]) => {
    return privacyPolicy.some((q) => q.title === '');
  };

  const editCategoriesHandler = async () => {
    if (
      !areprivacyPolicyUnchanged(data.layout.privacyPolicy, privacyPolicy) &&
      !isAnyprivacyPolicyTitleEmpty(privacyPolicy)
    ) {
      await editLayout({
        type: 'privacyPolicy',
        privacyPolicy,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center ">
          <h1 className={`${styles.title} text-gradient`}> Customize privacyPolicy</h1>
          {privacyPolicy &&
            privacyPolicy.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    {/* <input
                      className={`${styles.input} !w-[unset] !border-none !text-[20px]`}
                      value={item.title}
                      // here we send three things when function call
                      onChange={(e) => handleprivacyPolicyAdd(item._id, e.target.value, index)}
                      placeholder="Enter category title..."
                    /> */}
                    <textarea
                      name=""
                      id=""
                      cols={'100'}
                      rows="6"
                      className={`!w-[unset] dark:bg-gray-800 text-gray-100 p-3 800px:!text-[20px]`}
                      value={item.title}
                      // here we send three things when function call
                      onChange={(e) => handleprivacyPolicyAdd(item._id, e.target.value, index)}
                      placeholder="Enter category title..."></textarea>
                    <AiOutlineDelete
                      className=" dark:text-white text-black text-[48px] cursor-pointer"
                      onClick={() => {
                        setPrivacyPolicy((prevPrivacyPolicy: any) =>
                          prevPrivacyPolicy.filter((i: any) => i._id !== item._id)
                        );
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
              onClick={newprivacyPolicyHandler}
            />
          </div>

          {/* save button 👇 */}
          <div
            className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
            ${
              areprivacyPolicyUnchanged(data.layout.privacyPolicy, privacyPolicy) ||
              isAnyprivacyPolicyTitleEmpty(privacyPolicy)
                ? '!cursor-not-allowed'
                : '!cursor-pointer !bg-[#42d383]'
            }
            !rounded absolute bottom-12 right-12`}
            onClick={
              areprivacyPolicyUnchanged(data.layout.privacyPolicy, privacyPolicy) ||
              isAnyprivacyPolicyTitleEmpty(privacyPolicy)
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

export default EditPrivacyPolicy;
