'use client';
import { ThemeSwitcher } from '@/app/utils/ThemeSwitcher';
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from '../../../redux/features/notifications/notification';
import React, { FC, useEffect, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { IoMdNotificationsOutline } from 'react-icons/io';
// import socketIO from 'socket.io-client';
import { format } from 'timeago.js';
// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || '';
// const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });
import RefreshIcon from '@mui/icons-material/Refresh';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import { useGetAdminAllCoursesQuery } from '@/redux/features/courses/courseApi';

type Props = {
  open?: boolean;
  activeRefreshUsers?: boolean;
  activeRefreshCourses?: boolean;
  // activeRefreshAdminTeam?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({
  open,
  setOpen,
  // activeRefreshAdminTeam,
  activeRefreshUsers,
  activeRefreshCourses,
}) => {
  // get all notificition
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
  // for get all courses by admin
  const {
    isLoading: loading,
    data: courseData,
    refetch: courseRefetch,
  } = useGetAdminAllCoursesQuery({}, { refetchOnMountOrArgChange: true });

  const [updateNotificationStatus, { isSuccess, isLoading }] = useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  // const [audio] = useState<any>(
  //   typeof window !== 'undefined' &&
  //     new Audio('https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3')
  // );

  // const playNotificationSound = () => {
  //   audio.play();
  // };

  useEffect(() => {
    if (data) {
      // get inread notifications
      setNotifications(data.notifications.filter((item: any) => item.status === 'unread'));
    }
    if (isSuccess) {
      refetch();
    }
    // audio.load();
    // }, [data, isSuccess, audio]);
  }, [data, isSuccess]);

  // useEffect(() => {
  //   socketId.on('newNotification', (data) => {
  //     refetch();
  //     playNotificationSound();
  //   });
  // }, []);

  // this function change the notification status when user click on mark as read
  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center bg-[#029e88c9] dark:text-white dark:bg-[#1f2940] justify-end p-6 pb-0 fixed top-0 right-0 z-[99]">
      {activeRefreshUsers && (
        <div
          onClick={() => {
            refetch();
          }}
          className="hover:cursor-pointer">
          <RefreshIcon />
        </div>
      )}
      {activeRefreshCourses && (
        <div
          onClick={() => {
            courseRefetch();
          }}
          className="hover:cursor-pointer">
          <RefreshIcon />
        </div>
      )}
      {/* {activeRefreshAdminTeam && (
        <div
          onClick={() => {
            refetch();
          }}
          className="hover:cursor-pointer">
          <RefreshIcon />
        </div>
      )} */}
      <ThemeSwitcher />

      {/*  */}
      {/*  */}
      {/* notificition sections start here  */}
      <div className="relative cursor-pointer m-2" onClick={() => setOpen(!open)}>
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[300px] 800px:w-[350px] h-[60vh] overflow-y-scroll py-3 px-2 border border-[#ffffff0c] dark:bg-[#121212] bg-[#fff] shadow-xl absolute top-16 z-[101]  rounded ">
          <CancelIcon
            className="dark:text-white cursor-pointer"
            onClick={() => {
              setOpen(false);
            }}
          />
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">Notifications</h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                className="dark:bg-[#121212] bg-[#fff] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
                key={index}>
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-yellow-500 text-[12px]">{item.title}</p>
                  <p
                    className="text-black  text-[10px] dark:text-white cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}>
                    Mark as read
                  </p>
                </div>
                <p className=" font-Poppins  px-2 text-[10px] 800px:text-xs text-black dark:text-white">
                  {item.message}
                </p>
                <p className="p-2 text-black dark:text-gray-400 font-light text-[10px]">{format(item.createdAt)}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
