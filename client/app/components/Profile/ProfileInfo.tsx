import Image from 'next/image';
import { styles } from '../.././Styles/style';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import avatarIcon from '../../../public/assets/avatar.png';
// import { useEditProfileMutation, useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import { useLoadUserQuery } from '../../../redux/features/api/apiSlice';
import { toast } from 'react-hot-toast';
import { useUpdateAvatarMutation, useUpdateInfoMutation } from '../../../redux/features/user/userApi';
import { Nanum_Myeongjo } from 'next/font/google';

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation(); //user api for profile image
  // const [editProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation();
  // ----------------------------------------------------------------
  const [loadUser, setLoadUser] = useState(false); //this for calling the load user api
  const [updateInfo, { isSuccess: infoSuccess, error: infoError }] = useUpdateInfoMutation();
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true }); //when setLoadUser is true then new data add to user state

  // ----------------------------------------------------------------
  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  // ----------------------------------------------------------------
  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
    }
    if (error || infoError) {
      console.log(error);
    }
    if (infoSuccess) {
      toast.success('Profile updated successfully!');
      setLoadUser(true);
    }
  }, [isSuccess, error, infoSuccess, infoError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== '') {
      await updateInfo({
        name,
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon} //if avatar available in user data base then show it --if not then show userIcons
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2 dark:text-white">Full Name</label>
              <input
                type="text"
                className={`${styles.input}border border-gray-500 dark:border-white !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 dark:text-white">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0 border border-gray-500 dark:border-white`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-full 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
