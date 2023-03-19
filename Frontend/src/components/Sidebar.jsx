import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/Logo.png';
import { categories } from '../utils/data';

const isNotActiveStyle =
  'flex items-center px-5 gap-3 text-white transaction-all duration-200 ease-in-out capitalize ';
const isActiveStyle =
  'flex items-center px-5 gap-3 text-[#334756] font-extrabold transaction-all duration-200 ease-in-out capitalize h-10 bg-[#ff4c29] rounded-xl drop-shadow-md';

const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) {
      closeToggle(false);
    }
  };

  return (
    <div className="flex flex-col justify-between bg-gradient-to-b from-[#334756] to-[#2C394B] h-full overflow-y-auto min-w-210 h-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-14" />
        </Link>
        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <h1 className="mt-2 px-5 text-white 2xl:text-xl">
            <b>Discover categories</b>
          </h1>
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full border-2 sahdow-sm"
                alt="category"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white hover:bg-[#ff4c29] hover:text-[#334756] rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} alt="user" className="w-10 h-10 rounded-full border-2" />
          <p className="font-bold">{user.userName}</p>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
