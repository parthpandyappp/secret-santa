import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbArrowsJoin } from "react-icons/tb";
import heroimg from "../assets/heroimg.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState({
    value: false,
    class: "hidden",
  });

  const checkAuthAndNavigateToPage = (pageName) => {
    // TODO: add logic to check if user is logged in or not
    const isLoggedIn = false;

    if (pageName !== "login") {
      if (!authUser) {
        toast.error("You have not signed-in yet!", {
          style: {
            background: "#333",
            color: "#fff",
          },
        });
      } else {
        // navigate to the respective page
        navigate(`/${pageName}`, { replace: true });
      }
    } else {
      setShowModal({ value: true, class: "block" });
    }
  };
  return (
    <div className="flex flex-col gap-8 items-center justify-center grow text-xl">
      <div className="flex justify-center items-center flex-col">
        <img
          src={heroimg}
          alt="Santa is standing in front of a fireplace, surrounded by a pile of brightly wrapped gifts. He has a big smile on his face and is holding a large present in his hands. In front of him, a child is sitting at an easel, concentrating intently on their painting. The child has a smock on and is using bright colors to create a festive scene on their canvas. Santa is watching the child with a look of pride and joy, and as he hands over the present, the child looks up and smiles with excitement."
          className="h-64 w-64 rounded-full "
        />
        <h1 className="font-semibold text-4xl mt-2">Santaaa</h1>
        <p className="text-center text-gray-500">
          ho ho ho! Let's make each other's christmas adorable!
        </p>
      </div>
      <div className="flex md:flex-row flex-col gap-2">
        <button
          className="transition delay-150 flex justify-items-start items-center gap-2 px-8 py-4 bg-amber-200 group/item hover:bg-amber-300 rounded"
          onClick={() => {
            checkAuthAndNavigateToPage("explore");
          }}
        >
          <HiOutlineUserGroup className="transition delay-150 text-3xl p-1 bg-amber-300 group-hover/item:bg-amber-400 rounded" />
          My groups
        </button>
        <button
          className="transition delay-150 flex items-center gap-2 px-8 py-4 bg-green-200  group/item hover:bg-green-300 rounded"
          onClick={() => {
            checkAuthAndNavigateToPage("create");
          }}
        >
          <AiOutlineUsergroupAdd className="transition delay-150 text-3xl p-1 bg-green-300 group-hover/item:bg-green-400 rounded" />
          Create a group
        </button>
        <button
          className="transition delay-150 flex items-center gap-2 px-8 py-4 bg-red-200 rounded group/item hover:bg-red-300"
          onClick={() => {
            checkAuthAndNavigateToPage("join");
          }}
        >
          <TbArrowsJoin className="transition delay-150 text-3xl p-1 bg-red-300 group-hover/item:bg-red-400 rounded" />
          Join a group
        </button>
      </div>

      <div
        className={`${showModal.class} absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center h-full bg-gray-700/40 `}
      >
        <div className="p-4 bg-secondary text-paragraphDark rounded bg-slate-50">
          <div className="text-2xl flex w-full justify-between items-center px-2 py-2 font-bold">
            <h1>Create Group</h1>
            <button
              onClick={() => setShowModal({ value: false, class: "hidden" })}
            >
              Close
            </button>
          </div>
          <form className="flex flex-col border mx-1 rounded px-12 py-6">
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              name="groupName"
              id="groupName"
              className="border border-2 px-3 py-4 rounded"
              required
            />

            <button
              className="w-full border bg-primaryDark text-paragraphLight hover:opacity-80 my-2 px-3 py-2 rounded"
              type="submit"
            >
              Create Group
            </button>
          </form>
        </div>
      </div>

      <div>
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </div>
  );
}

export { Home };
