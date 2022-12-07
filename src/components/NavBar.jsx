import React from "react";
import heroimg from "../assets/heroimg.png";
import { signInWithGoogle } from "../features";
import { AiOutlineGoogle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  console.log("AUTH USER FROM NAV: ", authUser?.pic);
  return (
    <nav className="flex justify-between h-14 items-center">
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
        <img
          src={heroimg}
          className="h-10 w-10 rounded-full"
          alt="Santa is standing in front of a fireplace, surrounded by a pile of brightly wrapped gifts. He has a big smile on his face and is holding a large present in his hands. In front of him, a child is sitting at an easel, concentrating intently on their painting. The child has a smock on and is using bright colors to create a festive scene on their canvas. Santa is watching the child with a look of pride and joy, and as he hands over the present, the child looks up and smiles with excitement."
        />
        <h1 className="text-2xl font-semibold">
          <a href="/">Saantaa</a>
        </h1>
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
          <p className="text-lg flex gap-1">
            Welcome, {authUser?.name.split(" ")[0]}{" "}
            <span className="animate-bounce">👋</span>
          </p>
          <img
            src={authUser?.pic}
            className="w-10 h-10 rounded-full"
            alt=""
            referrerpolicy="no-referrer"
          />
        </div>
      )}
    </nav>
  );
};

export { NavBar };
