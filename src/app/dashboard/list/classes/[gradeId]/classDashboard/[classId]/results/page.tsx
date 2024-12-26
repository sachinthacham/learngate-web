"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { fetchResultData, role } from "@/lib/data";
import Image from "next/image";
import { useState, useEffect } from "react";

type Result = {
  id: number;

  subject: {
    id: number;
    name: string;
  };
  student: {
    id: number;
    name: string;
    surname: string;
  };
  class: {
    id: number;
    name: string;
  };
  exam: {
    id: number;
    title: string;
  };
  score: number;
};

const columns = [
  {
    header: "Exam Name",
    accessor: "name",
    className: "text-left pl-[20px]",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell text-left",
  },
  {
    header: "Student",
    accessor: "student",
    className: "text-left",
  },

  {
    header: "Subject",
    accessor: "subject",
    className: "hidden md:table-cell text-left",
  },
  // {
  // header:"Class",
  // accessor:"class",
  // className: "hidden md:table-cell"
  // },

  {
    header: "Actions",
    accessor: "actions",
  },
];
const ResultListpage = () => {
  const [result, setResult] = useState<Result[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchResultData();
      setResult(data);
    };
    fetchData();
  }, []);
  const renderRow = (item: Result) => (
    <tr
      key={item.id}
      className="norder-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.exam.title}</td>
      <td>{item.score}</td>
      <td className="hidden md:table-cell">
        {item.student.name}
        {item.student.surname}
      </td>
      <td className="hidden md:table-cell">{item.subject.name}</td>
      {/* <td className="hidden md:table-cell">{item.class.name}</td> */}

      <td>
        <div className="flex items-center gap-2">
          {role === "Admin" && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top */}
      <div className="">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 bg-[#cbf3f0] w-full md:w-auto py-2 justify-end">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1982c4]">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1982c4]">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "Admin" && <FormModal table="result" type="create" />}
          </div>
        </div>
      </div>
      {/* List */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={result} />
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default ResultListpage;
