import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createSecretGroup } from "../features";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const groupData = {
      gid: uuidv4(),
      creator: authUser.uid,
      createdAt: new Date(),
      groupName: groupName,
      members: [],
    };
    dispatch(
      createSecretGroup({
        groupData,
      })
    );
  };
  return (
    <div className="w-1/2 mx-auto flex flex-col justify-center items-center -mt-24 h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="gname" className="text-sm text-gray-500 font-bold">
          Group name
        </label>
        <input
          type="text"
          name="gname"
          onChange={(e) => setGroupName(e.target.value)}
          className="px-5 py-2 border border-2 rounded"
        />
        <button
          type="submit"
          className="transition delay-150 font-semibold text-gray-700 px-8 py-1 bg-amber-200 group/item hover:bg-amber-300 rounded w-4/5 text-center text-lg self-center mt-2"
        >
          Create group
        </button>
      </form>
    </div>
  );
}

export { CreateGroup };
