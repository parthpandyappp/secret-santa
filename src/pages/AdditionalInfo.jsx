import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

function AdditionalInfo() {
  const [suggestedHobbies, setSuggestedHobbies] = useState([
    {
      name: "Sports",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Music",
      isSelected: true,
      id: uuidv4(),
    },
    {
      name: "Reading",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Gaming",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Traveling",
      isSelected: true,
      id: uuidv4(),
    },
    {
      name: "Cooking",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Dancing",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Writing",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Drawing",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Painting",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Photography",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Singing",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Acting",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Gardening",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Blogging",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Programming",
      isSelected: false,
      id: uuidv4(),
    },
    {
      name: "Coding",
      isSelected: false,
      id: uuidv4(),
    },
  ]);

  const [extendHobbies, setExtendHobbies] = useState({
    value: "",
  });

  const handleClick = (id) => {
    console.log(id);

    const newHobbies = suggestedHobbies.map((hobby) => {
      if (hobby.id === id) {
        return {
          ...hobby,
          isSelected: !hobby.isSelected,
        };
      }
      return hobby;
    });

    console.log(newHobbies);

    setSuggestedHobbies(newHobbies);
  };

  useEffect(() => {
    console.log(suggestedHobbies);
  }, [suggestedHobbies]);

  return (
    <div className="flex flex-col gap-8 justify-start grow text-xl w-3/6 mx-auto">
      <div className="text-center">
        <h1 className="text-3xl">Additional info</h1>
        <p className="text-gray-500">Let us know more about you.</p>
      </div>

      <p className="text-left">Ques: Tell us about your hobbies?</p>
      <div className="flex flex-row justify-center flex-wrap gap-2">
        {suggestedHobbies.map((hobby) => (
          <div
            className={
              "flex flex-row gap-2 items-center justify-center rounded-md p-2 cursor-pointer " +
              (hobby.isSelected ? "bg-gray-300" : "bg-gray-100")
            }
            key={hobby.id}
            onClick={() => handleClick(hobby?.id)}
          >
            <p className="text-gray-500">{hobby.name}</p>
            {hobby.isSelected && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* ui chips for hobies input */}
      <div className="flex flex-row gap-4 justify-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="hobbies">Add more hobbies</label>
          <input
            type="text"
            name="hobbies"
            id="hobbies"
            value={extendHobbies.value}
            onChange={(e) =>
              setExtendHobbies({ ...extendHobbies, value: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSuggestedHobbies([
                  ...suggestedHobbies,
                  {
                    name: extendHobbies.value,
                    isSelected: true,
                    id: uuidv4(),
                  },
                ]);
                setExtendHobbies({ ...extendHobbies, value: "" });
              }
            }}
            placeholder="Cycling, Swimming, etc."
            className="border-2 border-gray-300 rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
}

export { AdditionalInfo };
