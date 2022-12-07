import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbArrowsJoin } from "react-icons/tb";
import heroimg from "../assets/heroimg.png";

function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center grow text-xl">
      <div className="flex justify-center items-center flex-col">
        <img src={heroimg} alt="" className="h-64 rounded-full " />
        <h1 className="font-semibold text-4xl mt-2">Santaaa</h1>
        <p className="text-center text-gray-500">
          ho ho ho! Let's make each other's christmas adorable!
        </p>
      </div>
      <div className="flex md:flex-row flex-col gap-2">
        <button className="transition delay-150 flex justify-items-start items-center gap-2 px-8 py-4 bg-amber-200 group/item hover:bg-amber-300 rounded">
          <HiOutlineUserGroup className="transition delay-150 text-3xl p-1 bg-amber-300 group-hover/item:bg-amber-400 rounded" />
          My groups
        </button>
        <button className="transition delay-150 flex items-center gap-2 px-8 py-4 bg-green-200 rounded group/item hover:bg-green-300 rounded">
          <AiOutlineUsergroupAdd className="transition delay-150 text-3xl p-1 bg-green-300 group-hover/item:bg-green-400 rounded" />
          Create a group
        </button>
        <button className="transition delay-150 flex items-center gap-2 px-8 py-4 bg-red-200 rounded group/item hover:bg-red-300">
          <TbArrowsJoin className="transition delay-150 text-3xl p-1 bg-red-300 group-hover/item:bg-red-400 rounded" />
          Join a group
        </button>
      </div>
    </div>
  );
}

export { Home };
