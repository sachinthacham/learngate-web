"use client"

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { role, fetchTeacherData,fetchSubjectData} from "@/lib/data";
import Link from "next/link";
import { useState,useEffect } from "react";

import {  FaEye} from "react-icons/fa"; // Importing specific icons from 'react-icons/fa'



// View Icon (FaEye)
const ViewIcon = () => {
  return <FaEye className="text-blue-600" size={24} />;
};

type Teacher = {
    id:number;
    teacherId:string;
    name:string;
    email?:string;
    photo:string;
    phone:string;
    subjects:[{
        id:number,
        name:string
    }];
    classes:string[];
    address:string;
}
type Subject = {
    id:number,
    name:string,
    teachers:[{
        id:number,
        name:string,
        surname:string
    }];
}
const columns = [
       {
        header:"Info",
        accessor: "info",
        className:"text-left"
       },
     
    //    {
    //     header:"Subjects",
    //     accessor: "subjects",
    //     className: "hidden md:table-cell"
    //    },
    //    {
    //     header:"Classes",
    //     accessor: "classes",
    //     className: "hidden md:table-cell"
    //    },
       {
       header:"Phone",
       accessor: "phone",
       className: "hidden lg:table-cell text-left"
       },
       {
       header:"Address",
       accessor: "address",
       className: "hidden lg:table-cell text-left"
       },
       {
       header:"Actions",
       accessor: "actions",
       className: "hidden md:table-cell text-left"
       },

]
const TeacherListpage = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [search, setSearch] = useState<string>("");
    const [pageNumber, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [teacher, setTeacher] = useState<Teacher[]>([]);
    const [subjectId, setSubjectId] = useState<number | undefined>();
  
    const pageSize = 5;
  
    useEffect(() => {
      const fetchData = async () => {
        const { data, totalRecords } = await fetchTeacherData(
          pageNumber,
          pageSize,
          search,
          subjectId
        );
        setTeacher(data);
        setTotalPages(Math.ceil(totalRecords / pageSize));
      };
      const fetchSubjectsData = async () => {
        const data = await fetchSubjectData();
        setSubjects(data);
      };
      fetchData();
      fetchSubjectsData();
    }, [pageNumber, search, subjectId]);
  
    const handleFilterBySubjectId = (id: number | undefined) => {
      setSubjectId(id);
    };
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
  
    const renderPagination = () => (
      <div className="flex justify-between items-center py-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={pageNumber === totalPages}
        >
          Next
        </button>
      </div>
    );
  
    const renderRow = (item: Teacher) => (
      <tr
        key={item.id}
        className="border-b last:border-none hover:bg-gray-100 transition"
      >
        <td className="flex items-center gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-800">{item.name}</h3>
            <h4 className="text-sm text-gray-500">{item?.email}</h4>
          </div>
        </td>
        <td className="hidden md:table-cell text-gray-700">{item.phone}</td>
        <td className="hidden md:table-cell text-gray-700">{item.address}</td>
        <td className="flex gap-2">
          <Link href={`/dashboard/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center">
              <ViewIcon/>
            </button>
          </Link>
          {role === "Admin" && (
            <>
              <FormModal table="student" type="update" id={item.id}/>
              <FormModal table="teacher" type="delete" id={item.id} />
            </>
          )}
        </td>
      </tr>
    );
  
    return (
      <div className="bg-gray-50 p-6 rounded-md shadow-sm">
        {/* Top */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">All Teachers</h1>
          <div className="flex gap-4">
            <input
              className="h-10 px-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search teachers..."
              onChange={handleSearch}
              value={search}
            />
            <select
              className="h-10 px-3 border rounded-lg"
              onChange={(e) => handleFilterBySubjectId(Number(e.target.value))}
            >
              <option value="0">All Subjects</option>
              {subjects.map((subject, i) => (
                <option key={i} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            {role === "Admin" && (
              <>
                
                <FormModal table="teacher" type="create" />
              </>
            )}
          </div>
        </div>
        {/* List */}
        <Table columns={columns} renderRow={renderRow} data={teacher} />
  
        {/* Pagination */}
        {renderPagination()}
      </div>
    );
  };
  export default TeacherListpage;
  