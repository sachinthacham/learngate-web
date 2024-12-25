import React from "react";
import FormModal from "./FormModal";
import { role } from "@/lib/data";
import { IoIosArrowForward } from "react-icons/io";

type CardType = {
  item: {
    classSubjectId: number;
    classSubject: {};
    id: number;
    name: string;
  };
};

const SubjectCard = ({ item }: CardType) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 flex items-center justify-between"
      style={{ width: "60%", height: "auto" }}
    >
      {/* Lesson Name */}
      <div className="flex gap-3 justify-around items-center">
        <IoIosArrowForward />
        <p className="text-base font-sans text-gray-800">{item.name}</p>
      </div>

      {/* Buttons Section */}
      <div className="flex items-center gap-4">
        {/* Mark as Done Button */}
        <button
          className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
          onClick={() => console.log(`Marked as done: ${item.name}`)} // Replace with actual functionality
        >
          Mark as Done
        </button>

        {/* Admin-specific Buttons */}
        {role === "Admin" && (
          <>
            {/* Edit Button */}
            <FormModal table="subject" type="update" data={item} />

            {/* Delete Button */}
            <FormModal table="subject" type="delete" id={item.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
