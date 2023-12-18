'use client';
import { FC, useEffect, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import 'react-pro-sidebar/dist/css/styles.css';
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from './Icons';
import avatarDefault from '../../../../public/assets/avatar.png';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<itemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem active={selected === title} onClick={() => setSelected(title)} icon={icon}>
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setlogout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = () => {
    setlogout(true);
  };

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${theme === 'dark' ? '#111C43 !important' : '#029e88c9 !important'}`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item:hover': {
          color: '#gray !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
          opacity: 1,
        },
        '& .pro-menu-item': {
          color: `${theme !== 'dark' && '#000'}`,
        },
      }}
      className="!bg-[#111C43] dark:bg-[#111C43]">
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 100,
          width: isCollapsed ? '0%' : '10%',
        }}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
            }}>
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Link href="/" className="block">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">ELearning</h3>
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className="inline-block">
                  <ArrowBackIosIcon className="text-black dark:text-[#ffffffc1]" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="">
                <Image
                  alt="profile-user"
                  width={50}
                  height={50}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: 'pointer',
                    // borderRadius: '50%',
                    border: '3px solid #5b6fe6',
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: '10px 0 0 0' }}>
                  {user?.name}
                  <span className="!text-[12px] text-black dark:text-[#ffffffc1] capitalize"> (admin)</span>
                </Typography>
                {/* <Typography
                  variant="h6"
                  sx={{ m: '10px 0 0 0' }}
                  className="!text-[20px] text-black font-extrabold dark:text-[#ffffffc1] capitalize">
                  - {user?.role}
                </Typography> */}
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '1%'}>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item
                title="Dashboard"
                to="/admin"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <Typography
              variant="h5"
              sx={{ m: '15px 0 5px 25px' }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]">
              {!isCollapsed && 'Data'}
            </Typography>
            <Item
              title="AllUsers"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <div
              onClick={() => {
                setIsCollapsed(false);
              }}>
              <Item
                title="Invoices"
                to="/admin/inVoice"
                icon={<ReceiptOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>

            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: '15px 0 5px 20px' }}>
              {!isCollapsed && 'Content'}
            </Typography>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item
                title="Create Course"
                to="/admin/create-course"
                icon={<VideoCallIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item
                title="All Courses"
                to="/admin/courses"
                icon={<OndemandVideoIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: '15px 0 5px 20px' }}>
              {!isCollapsed && 'Customization'}
            </Typography>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item title="Hero" to="/admin/hero" icon={<WebIcon />} selected={selected} setSelected={setSelected} />
            </div>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item title="FAQ" to="/admin/faq" icon={<QuizIcon />} selected={selected} setSelected={setSelected} />
            </div>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item
                title="Categories"
                to="/admin/categories"
                icon={<WysiwygIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <Typography
              variant="h5"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: '15px 0 5px 20px' }}>
              {!isCollapsed && 'Controllers'}
            </Typography>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item
                title="Manage Team"
                to="/admin/team"
                icon={<PeopleOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: '15px 0 5px 20px' }}>
              {!isCollapsed && 'Analytics'}
            </Typography>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item
                title="Courses Analytics"
                to="/admin/coursesAnalytics"
                icon={<BarChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item
                title="Orders Analytics"
                to="/admin/orderAnalytics"
                icon={<MapOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div
              onClick={() => {
                setIsCollapsed(!isCollapsed);
              }}>
              <Item
                title="Users Analytics"
                to="/admin/userAnalytics"
                icon={<ManageHistoryIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <Typography
              variant="h6"
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]"
              sx={{ m: '15px 0 5px 20px' }}>
              {!isCollapsed && 'Extras'}
            </Typography>
            <div onClick={logoutHandler}>
              <Item title="Logout" to="/" icon={<ExitToAppIcon />} selected={selected} setSelected={setSelected} />
            </div>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
