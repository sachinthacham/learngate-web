import React from "react";
import FormModal from "./FormModal";
import { role } from "@/lib/data";

type cardType = {
  item: {
    classSubjectId: number;
    subject: {
      id: number;
      name: string;
    };
    teacher: {
      id: number;
      name: string;
      surname: string;
    };
    class: {
      id: number;
      name: string;
    };
  };
};

const SubjectCard = ({ item }: cardType, classId: number) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
      {/* Subject Name */}
      <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
        {item.subject.name}
      </h2>

      {/* Teacher Name */}
      <p className="text-lg font-medium text-[#3f37c9] mb-6">
        {item.teacher.name} {item.teacher.surname}
      </p>

      {/* Admin Controls */}
      {role === "Admin" && (
        <div className="flex items-center gap-4">
          <FormModal table="subject" type="update" data={item} />
          <FormModal table="subject" type="delete" id={item.classSubjectId} />
        </div>
      )}
    </div>
  );
};

export default SubjectCard;
