"use client";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { fetchEventData, role } from "@/lib/data";
import Image from "next/image";
import { useState, useEffect } from "react";

type Event = {
  id: number;
  title: string;
  classId: number;
  description: string;
  class: {
    id: number;
    name: string;
  };
  date: string;
  startTime: string;
  endTime: string;
};

const columns = [
  { header: "Title", accessor: "title" },
  { header: "Class", accessor: "class" },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell text-gray-500",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell text-gray-500",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell text-gray-500",
  },
  { header: "Actions", accessor: "actions" },
];

const EventListPage = () => {
  const [Event, setEvent] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchEventData();
      setEvent(data);
    };
    fetchData();
  }, []);

  const renderRow = (item: Event) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-gray-50 hover:bg-gray-100"
    >
      <td className="p-4 text-gray-800">{item.title}</td>
      <td className="p-4 text-gray-600">{item.class.name}</td>
      <td className="hidden md:table-cell p-4 text-gray-600">{item.date}</td>
      <td className="hidden md:table-cell p-4 text-gray-600">
        {item.startTime}
      </td>
      <td className="hidden md:table-cell p-4 text-gray-600">{item.endTime}</td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          {role === "Admin" && (
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-6 rounded-md shadow-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
          <TableSearch />
          <div className="flex items-center gap-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600">
              <Image src="/filter.png" alt="Filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600">
              <Image src="/sort.png" alt="Sort" width={14} height={14} />
            </button>
            {role === "Admin" && (
              <FormModal
                table="event"
                type="create"
                
              />
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={Event} />
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination />
      </div>
    </div>
  );
};

export default EventListPage;
