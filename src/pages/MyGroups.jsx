import React, { useState } from "react";

function MyGroups() {
  const [groupData, setGroupData] = useState([
    {
      gid: "1",
      name: "Group 1",
      creator: "uid1",
      members: [],
      isMatched: false,
    },
    {
      gid: "2",
      name: "Group 2",
      creator: "uid2",
      members: [],
      isMatched: true,
    },
    {
      gid: "3",
      name: "Group 3",
      creator: "uid3",
      members: [],
      isMatched: false,
    },
  ]);
  return (
    <div className="flex flex-col gap-8 items-center justify-start grow text-xl">
      <h1 className="text-3xl my-6">My Groups</h1>
      <div className="flex gap-4 items-center justify-center">
        {groupData.map((group) => {
          return (
            <div className="flex flex-col gap-2 items-start justify-center border border-2 py-3 w-60 px-4 rounded bg-red-200">
              <h1>{group.name}</h1>
              <p>{group.isMatched ? "Matched" : ""}</p>
              <button className="bg-primaryDark text-paragraphLight py-2 rounded">
                View Group
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MyGroups };
