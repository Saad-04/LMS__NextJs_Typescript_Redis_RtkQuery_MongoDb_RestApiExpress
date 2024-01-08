import React from 'react';
import Link from 'next/link';
// add bootstrap css
type Props = {};

const NotFound = (props: Props) => {
  return (
    <>
      <div className="flex items-center justify-center h-screen dark:text-white">
        <div className="flex-col space-y-4 text-left px-6">
          <div className="text-7xl font-bold text-violet-700">404</div>
          <div className="text-stone-500  dark:text-white font-medium">
            Oops, you still haven't found what you lookng for?
          </div>
          <div className="flex space-x-4 items-center justify-start">
            <Link href={'/'}>
              <div className="bg-violet-700 px-4 py-1 dark:text-white text-white font-medium border-2 border-gray-400  dark:text-white hover:scale-105 cursor-pointer">
                ⬅{' '}
              </div>
            </Link>
            <div className="text-sm font-medium text-stone-500 dark:text-white">Back to Home Page</div>
          </div>
        </div>
      </div>
      {/* <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      {/* */}
    </>
  );
};

export default NotFound;
