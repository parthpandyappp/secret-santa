import React, { useState } from "react";
import heroimg from "../assets/heroimg.png";
import { AiOutlineGoogle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle, userLogout } from "../features";

const NavBar = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { authUser } = useSelector((state) => state.auth);
  console.log("AUTH USER FROM NAV: ", authUser?.pic);
  return (
    <nav className="flex justify-between h-14 items-center px-2 md:p-0">
      <div className="flex gap-2 items-center">
        {/* <svg
          className="w-6 h-6 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg> */}
        <img src={heroimg} className="h-10 w-10 rounded-full" alt="" />
        <h1 className="text-2xl font-semibold">Saantaa</h1>
      </div>
      {!authUser ? (
        <div className="flex items-center gap-1">
          <p className="text-lg">Sign in</p>
          <AiOutlineGoogle
            className="cursor-pointer hover:text-red-400 text-3xl"
            onClick={() => dispatch(signInWithGoogle())}
          />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <p className="text-lg md:flex gap-1 hidden">
            Welcome, {authUser?.name.split(" ")[0]}{" "}
            <span className="animate-bounce">👋</span>
          </p>
          <div className="relative">
            <img
              src={authUser?.pic}
              className="w-10 h-10 rounded-full"
              alt=""
              referrerpolicy="no-referrer"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <ul className="z-10 absolute -bottom-30 right-0 bg-white shadow-2xl py-4 text-md text-paragraph font-medium w-24 px-1">
                <li className="hover:bg-gray-50 px-1">Profile</li>
                <li className="hover:bg-gray-50 px-1">My groups</li>
                <li
                  className="hover:bg-gray-50 px-1 text-red-500 cursor-pointer"
                  onClick={() => dispatch(userLogout())}
                >
                  {" "}
                  Logout
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export { NavBar };
