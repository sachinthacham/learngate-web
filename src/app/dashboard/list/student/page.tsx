"use client";

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { fetchStudentData, role, fetchClassesData, fetchGradeData } from "@/lib/data";
import { useEffect, useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa"; // Importing specific icons from 'react-icons/fa'



// View Icon (FaEye)
const ViewIcon = () => {
  return <FaEye className="text-blue-600" size={24} />;
};



type Student = {
  id: number;
  userName: string;
  name: string;
  surname: string;
  email?: string;
  phone?: string;
  address: string;
  img: string;
  bloodType: string;
  sex: number;
  parent: {
    id: number;
    name: string;
    surname: string;
  };
  class: {
    id: number;
    name: string;
  };
  grade: {
    id: number;
    level: number;
  };
};
type Class = {
  id: number;
  name: string;
  capacity: number;
  gradeId: number;
  grade: {
    id: number;
    level: number;
  };
  supervisorId: number;
  supervisor: {
    id: number;
    name: string;
    surname: string;
  };
};

type Grade = {
  id: number;
  level: number;
};

const columns = [
  { header: "Info", accessor: "info", className: "text-left pl-8" },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell text-left" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell text-left" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell text-left" },
  { header: "Actions", accessor: "actions", className: "hidden md:table-cell text-left" },
];

const StudentListPage = () => {
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [gradeId, setGradeId] = useState<number | undefined>();
  const [classId, setClassId] = useState<number | undefined>();
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      const { data, totalRecords } = await fetchStudentData(
        pageNumber,
        pageSize,
        classId,
        gradeId,
        search
      );
      setStudentData(data);
      setTotalPages(Math.ceil(totalRecords / pageSize));
    };
    const fetchClassData = async () => {
      const classData = await fetchClassesData();
      setClasses(classData);
    };
    const fetchGradesData = async () => {
      const gradeData = await fetchGradeData();
      setGrades(gradeData);
    };

    fetchData();
    fetchClassData();
    fetchGradesData();
  }, [search, classId, gradeId, pageNumber]);

  const handleFilterByGradeId = (id: number | undefined) => {
    setGradeId(id);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFilterByClassId = (id: number | undefined) => {
    setClassId(id);
  };

  const renderPagination = () => (
    <div className="flex justify-center items-center gap-4 mt-4">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={pageNumber === 1}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
      >
        Previous
      </button>
      <span className="text-gray-600">
        Page {pageNumber} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={pageNumber === totalPages}
        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
      >
        Next
      </button>
    </div>
  );

  const renderRow = (item: Student) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-gray-50 hover:bg-gray-100"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <h4 className="text-xs text-gray-500">{item.class.name}</h4>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.grade.level}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/list/students/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full  text-white hover:bg-blue-600">
              <ViewIcon/>
            </button>
          </Link>
          {role === "Admin" && (
            <>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600">
              <FormModal table="student" type="update" id={item.id}/>
              </button>
              <FormModal table="student" type="delete" id={item.id} />
              
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-lg font-semibold mb-4 md:mb-0">All Students</h1>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={handleSearch}
            value={search}
          />
          <select
            onChange={(e) => handleFilterByGradeId(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="0">All Grades</option>
            {grades.map((grade, i) => (
              <option key={i} value={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleFilterByClassId(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="0">All Classes</option>
            {classes.map((c, i) => (
              <option key={i} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {role === "Admin" && (
              <>
                
                <FormModal table="student" type="create" />
              </>
            )}
        </div>
      </div>
      <Table columns={columns} renderRow={renderRow} data={studentData} />
      {renderPagination()}
    </div>
  );
};

export default StudentListPage;
