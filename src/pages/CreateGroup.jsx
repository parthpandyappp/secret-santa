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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setGroupName(e.target.value)} />
        <button type="submit">Create group</button>
      </form>
    </div>
  );
}

export { CreateGroup };
