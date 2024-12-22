"use client";
import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";
import EventForm from "./forms/EventForm";
import AnnouncementForm from "./forms/AnnouncementForm";

import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import ClassForm from "./forms/ClassForm";
import SubjectForm from "./forms/SubjectForm";

const CreateIcon = () => {
  return <FaPlus className="text-green-500" size={24} />;
};

const UpdateIcon = () => {
  return <FaEdit className="text-black" size={24} />;
};
const DeleteIcon = () => {
  return <FaTrash className="text-red-600" size={24} />;
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcements";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number;
}) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-white"
      : type === "update"
      ? "bg-white"
      : "bg-white";
  const [open, setOpen] = useState(false);

  const renderForm = () => {
    if (type === "delete" && id) {
      return (
        <form action="" className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    }

    if (type === "update" && id) {
      switch (table) {
        case "teacher":
          return <TeacherForm type="update" data={data} />;
        case "event":
          return <div>Event update form goes here</div>;
        case "student":
          return <div>Student update form goes here</div>;
        case "class":
          return <ClassForm type="update" data={data} />;
        case "subject":
          return <SubjectForm type="update" />;
        default:
          return <div>Form for {table} update not implemented</div>;
      }
    }

    if (type === "create") {
      switch (table) {
        case "teacher":
          return <TeacherForm type="create" />;
        case "event":
          return <EventForm type="create" />;
        case "announcements":
          return <AnnouncementForm type="create" />;
        case "class":
          return <ClassForm type="create" />;
        case "subject":
          return <SubjectForm type="create" />;

        default:
          return <div>Form for {table} creation not implemented</div>;
      }
    }

    return null; // Fallback for unhandled cases
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
      >
        {type === "create" ? (
          <CreateIcon />
        ) : type === "update" ? (
          <UpdateIcon />
        ) : (
          <DeleteIcon />
        )}
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            {renderForm()}
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" height={14} width={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
