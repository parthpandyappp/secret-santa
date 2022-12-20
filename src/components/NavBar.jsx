import { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signInWithGoogle, userLogout } from "../features";
import { toastWarning } from "../helper-functions";
import heroimg from "../assets/heroimg.png";

const NavBar = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <nav className="flex justify-between h-14 items-center">
      <div className="flex gap-2 items-center">
        <img
          src={heroimg}
          className="h-10 w-10 rounded-full"
          alt="Santa is standing in front of a fireplace, surrounded by a pile of brightly wrapped gifts. He has a big smile on his face and is holding a large present in his hands. In front of him, a child is sitting at an easel, concentrating intently on their painting. The child has a smock on and is using bright colors to create a festive scene on their canvas. Santa is watching the child with a look of pride and joy, and as he hands over the present, the child looks up and smiles with excitement."
        />
        <h1 className="text-2xl font-semibold">
          <Link to="/">Saantaa</Link>
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
        <>
          {authUser && (
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(!showDropdown)}
              onMouseLeave={() => setShowDropdown(!showDropdown)}
            >
              <div className="flex gap-2 items-center">
                <p className="text-lg flex gap-1">
                  Welcome, {authUser?.name.split(" ")[0]}{" "}
                  <span className="animate-bounce">👋</span>
                </p>
                <img
                  src={authUser?.pic}
                  className="w-10 h-10 rounded-full"
                  alt=""
                  referrerPolicy="no-referrer"
                />
              </div>
              {showDropdown && (
                <ul className="z-10 absolute -bottom-30 right-0 bg-white shadow-2xl py-4 text-md text-paragraph font-medium">
                  <Link to={"/explore"} onClick={() => setShowDropdown(false)}>
                    <li className="hover:bg-gray-50 px-6">Profile</li>
                  </Link>
                  <Link to={"/mygroups"} onClick={() => setShowDropdown(false)}>
                    <li className="hover:bg-gray-50 px-6">My Groups</li>
                  </Link>
                  <li
                    className="hover:bg-gray-50 px-6 text-red-500 cursor-pointer"
                    onClick={() => {
                      dispatch(userLogout());
                      toastWarning("User Logged Out");
                    }}
                  >
                    {" "}
                    Logout
                  </li>
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export { NavBar };
