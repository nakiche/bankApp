import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-[#046CD9] items-center  ">
      <div></div>

      <div className=" h-12 rounded bg-gray-50 dark:bg-gray-800 ">
        <p className="text-2xl text-[#fff] dark:text-gray-500 text-center	">
          <span className="align-middle italic font-bold ">Real World App</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-end ">
        <div className="flex items-center justify-center h-24 rounded pr-2">
        <Link to="/newpayment">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            <button className="bg-transparent hover:bg-blue-500 text-blue-600 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded bg-[#50d71e]">
              $ NEW
            </button>
          </p>
         </Link> 
        </div>
        <div className="flex items-center justify-center h-24 rounded pr-4 ">
        <button type="button" className="relative inline-flex">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
          </p>
          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[red] border-2 border-[red] rounded-full -top-2 -right-2 dark:border-gray-900">0</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
