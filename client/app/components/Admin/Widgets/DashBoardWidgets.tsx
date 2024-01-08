import React, { FC, useEffect, useState } from 'react';
import UserAnalytics from '../Analytics/UserAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import { PiUsersFourLight } from 'react-icons/pi';
import { Box, CircularProgress } from '@mui/material';
import OrdersAnalytics from '../Analytics/OrderAnalytics';
import AllInvoices from '../Order/AllInVoices';
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import { useGetCompanyNameQuery, useUpdateCompanyNameMutation } from '@/redux/features/company/companyApi';

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? 'info' : 'error'}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();
  const [inputValue, setInputValue] = useState();
  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } = useGetOrdersAnalyticsQuery({});
  const {
    data: companyData,
    isLoading: companyLoading,
    refetch: companyRefetch,
  } = useGetCompanyNameQuery({ refetchOnMountOrArgChange: true });
  //
  const [updateCompanyName, { data: updateName, isSuccess: updateSuccess, isLoading: updateloading }] =
    useUpdateCompanyNameMutation();
  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (usersLastTwoMonths.length === 2 && ordersLastTwoMonths.length === 2) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0 ? ((usersCurrentMonth - usersPreviousMonth) / usersPreviousMonth) * 100 : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0 ? ((ordersCurrentMonth - ordersPreviousMonth) / ordersPreviousMonth) * 100 : 100;

          setuserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
    if (updateSuccess) {
      companyRefetch();
    }
  }, [isLoading, ordersLoading, data, ordersData, updateSuccess]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const id = companyData?.company._id;
    updateCompanyName({ newName: inputValue, id: id });
  };
  // \
  return (
    <div className="mt-[30px] min-h-screen">
      <div className=" flex flex-col 800px:grid 800px:grid-cols-[100%]  [75%,25%]">
        {/* \ */}
        {/*  */}
        {/* first container down  */}
        <div className="800px:p-8 pb-5">
          <div className="flex justify-center dark:bg-[#111C43] ">
            <div className="flex  justify-center  shadow max-w-7xl w-[90] dark:border-white border-gray-500 border border-2 p-5 m-4">
              <form className="h-[90%] w-full mt-2">
                <div className="flex flex-col justify-center items-center mt-2 space-y-6 md:space-y-8">
                  <div className="space-y-2">
                    <h1 className="text-xl font-semibold text-black dark:text-white">
                      Previous Name :{' '}
                      <span className=" text-cyan-600 text-[#111C43]">
                        {companyLoading ? 'loading...' : companyData?.company.companyName}
                      </span>
                    </h1>
                    <div>
                      {' '}
                      <h1 className="text-xl font-semibold text-black dark:text-white">
                        Here you can change Company Name:
                      </h1>{' '}
                    </div>
                    <br />
                    <h1 className="text-base text-black dark:text-gray-200">Company Name</h1>
                    <input
                      type="text"
                      placeholder={companyData?.company.companyName}
                      value={inputValue}
                      onChange={(e: any) => setInputValue(e.target.value)}
                      className="dark:border-none border border:black border-2 dark:font-bold rounded-md px-5 py-2 dark:bg-gray-300  dark:text-gray-600 focus:outline-none font-semibold md:w-72 lg:w-[340px]"
                    />
                  </div>
                </div>
                <div className="text-center mt-10">
                  <button
                    onClick={(e) => handleSubmit(e)}
                    className="uppercase px-24 md:px-[78px] lg:px-[70px] py-2 rounded-md bg-[#111C43] text-white dark:bg-gradient-to-b   font-medium ">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="800px:p-8 pb-5">
          <UserAnalytics isDashboard={true} />
        </div>
        {/* first container end up  */}
        {/*  */}
        {/*  */}
        {/* second container down */}
        <div className="800px:pt-[80px] pr-8 ">
          {/*  */}
          {/*  */}
          {/* firt sales obtain container  */}
          <div className="w-[90%] 800px:w-full dark:bg-[#111C43] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {ordersComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={ordersComparePercentage?.percentChange > 0 ? 100 : 0} open={open} />
                <h5 className="text-center pt-4">
                  {ordersComparePercentage?.percentChange > 0
                    ? '+' + ordersComparePercentage?.percentChange.toFixed(2)
                    : '-' + ordersComparePercentage?.percentChange.toFixed(2)}{' '}
                  %
                </h5>
              </div>
            </div>
          </div>
          {/* second new users  container  */}
          <div className="w-[90%] 800px:w-full dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">New Users</h5>
              </div>
              <div>
                <CircularProgressWithLabel value={userComparePercentage?.percentChange > 0 ? 100 : 0} open={open} />
                <h5 className="text-center pt-4">
                  {userComparePercentage?.percentChange > 0
                    ? '+' + userComparePercentage?.percentChange.toFixed(2)
                    : '-' + userComparePercentage?.percentChange.toFixed(2)}{' '}
                  %
                </h5>
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
        </div>
        {/* second container end up  */}
        {/*  */}
        {/*  */}
        {/*  */}
      </div>
      {/* order analytics board */}
      <div className="grid grid-cols-[100%] mt-[-20px]">
        <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm 800px:m-auto">
          <OrdersAnalytics isDashboard={true} />
        </div>
      </div>
      {/*  */}
      {/* order transaction board */}
      <div className="800px:w-[90%] mx-auto">
        <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">Recent Transactions</h5>
        <AllInvoices isDashboard={true} />
      </div>
      {/* / */}
    </div>
  );
};

export default DashboardWidgets;
