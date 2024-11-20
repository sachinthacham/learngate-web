"use client";

import { useState, useEffect } from "react";
import { fetchClassesData } from "@/lib/data";

type EventFormProps = {
  type: "create" | "update";
  data?: {
    id: number;
    title: string;
    classId: number;
    date: string;
    startTime: string;
    endTime: string;
  };
};

type Class = {
  id: number;
  name: string;
};

const EventForm = ({ type, data }: EventFormProps) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [formData, setFormData] = useState({
    title: data?.title || "",
    classId: data?.classId || 0,
    date: data?.date || "",
    startTime: data?.startTime || "",
    endTime: data?.endTime || "",
  });

  useEffect(() => {
    const fetchClassData = async () => {
      const classData = await fetchClassesData();
      setClasses(classData);
    };
    fetchClassData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "create") {
      // API call to create event
      console.log("Creating event:", formData);
    } else if (type === "update") {
      // API call to update event
      console.log("Updating event:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="classId" className="block text-sm font-medium text-gray-700">
          Class
        </label>
        <select
          id="classId"
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="" disabled>
            Select a class
          </option>
          {classes.map((classItem) => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
          Start Time
        </label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        {type === "create" ? "Create Event" : "Update Event"}
      </button>
    </form>
  );
};

export default EventForm;
