'use client';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import NavItems from '../utils/NavItems';
import { ThemeSwitcher } from '../utils/ThemeSwitcher';
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from 'react-icons/hi';
import CustomModel from '../utils/CustomModel';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Loader from './Loader/Loader';
import Verification from './Auth/Verification';
import { useSelector } from 'react-redux';
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void; //this for usestate in page.tsx
  activeItem: number;
  route: string;
  setRoute: (route: string) => void; //this for usestate in page.tsx for login form
};

const Header: FC<Props> = ({ open, setOpen, activeItem, setRoute, route }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user } = useSelector((state: any) => {
    return state.auth; //response object
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === 'screen') {
      {
        setOpenSidebar(false); //when click on outside of navbar the header clone
      }
    }
  };
  console.log(user);
  return (
    <>
      <div className="w-full relative">
        <div
          className={`${
            active
              ? 'dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500'
              : 'w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow'
          }`}>
          {/* pc header start here  */}
          <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
            <div className="w-full h-[80px] flex items-center justify-between p-3">
              {/* --------------first box */}
              <div>
                <Link href={'/'} className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                  ELearning
                </Link>
              </div>
              {/* ------------------second box */}
              <div className="flex items-center">
                <NavItems activeItem={activeItem} isMobile={false} />
                {/* active Item is header nav item number */}
                <ThemeSwitcher />
                <div className="800px:hidden">
                  <HiOutlineMenuAlt3
                    size={25}
                    className="cursor-pointer dark:text-white text-black"
                    onClick={() => setOpenSidebar(true)} //when click on this then sidebar nav is showed
                  />
                </div>
                <HiOutlineUserCircle
                  size={25}
                  className="hidden 800px:block cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              </div>

              {/* ------------------second box end*/}
            </div>
          </div>
          {/* pc header end */}

          {/* mobile sidebar */}
          {openSidebar && (
            <div
              className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
              onClick={handleClose}
              id="screen">
              <div className="w-[70%] fixed z-[999999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
                <NavItems activeItem={activeItem} isMobile={true} />
                <HiOutlineUserCircle
                  size={25}
                  className="ml-6 cursor-pointer dark:text-white text-black"
                  onClick={() => {
                    setOpen(true);
                    setOpenSidebar(false);
                  }}
                />

                <br />

                <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                  Copyright © 2023 <span className="text-yellow-500">asaad4674@gmail.com</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* form section start from here  */}
        {route === 'Login' && (
          <>
            {open && (
              <>
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  route={route}
                  setRoute={setRoute}
                  component={Login}
                  activeItem={activeItem} //this come from page.tsx for header item index
                />
              </>
            )}
          </>
        )}
        {route === 'Sign-Up' && (
          <>
            {open && (
              <>
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  route={route}
                  setRoute={setRoute}
                  component={SignUp}
                  activeItem={activeItem} //this come from page.tsx for header item index
                />
              </>
            )}
          </>
        )}
        {route === 'Verification' && (
          <>
            {open && (
              <>
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  route={route}
                  setRoute={setRoute}
                  component={Verification}
                  activeItem={activeItem} //this come from page.tsx for header item index
                />
              </>
            )}
          </>
        )}
        {route === 'Loader' && (
          <>
            {open && (
              <>
                <CustomModel
                  open={open}
                  setOpen={setOpen}
                  route={route}
                  setRoute={setRoute}
                  component={Loader}
                  activeItem={activeItem} //this come from page.tsx for header item index
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Header;
