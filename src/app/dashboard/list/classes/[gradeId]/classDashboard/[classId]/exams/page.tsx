"use client"
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {fetchExamData, role} from "@/lib/data";
import Image from 'next/image';
import Link from "next/link";
import { useState,useEffect } from "react";

type Exam = {
    id:number;
    title:string;
    subject:{
        id:number,
        name:string
    }
    class:{
        id:number,
        name:string
    },
    lesson:{
        id:number,
        name:string
    },
    startTime:string;
    endTime:string
    
   
}

const columns = [
    {
     header: "Subject Name",
     accessor : "name",
    },
    {
    header:"Class",
    accessor: "class",
   
    },
    {
    header:"Teacher",
    accessor:"teacher",
    className: "hidden md:table-cell"
    },
    {
    header:"Date",
    accessor:"date",
    className: "hidden md:table-cell"
    },
    {
    header:"Actions",
    accessor: "actions",
    },

]
const ExamListpage = () => {
    const[exam, setExam] = useState<Exam[]>([]);

    useEffect(() => {
        const fexchData = async () => {
            const data = await fetchExamData();
            setExam(data);
        }
        fexchData();
    },[]); 
    const renderRow = (item:Exam) => (
        <tr key={item.id} className="norder-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.title}</td>
            <td>{item.subject.name}</td>
            <td className="hidden md:table-cell">{item.class.name}</td>
            <td className="hidden md:table-cell">{item.lesson.name}</td>
            <td className="hidden md:table-cell">{item.startTime}</td>
            <td className="hidden md:table-cell">{item.endTime}</td>
           
            <td>
                <div className="flex items-center gap-2">
                    
                    {role === "Admin" && (
                        <>
                        <FormModal table="exam" type="update" data={item}/>
                        <FormModal table="exam" type="delete" id={item.id}/>
                        </>
                    )}
                </div>
            </td>
        </tr>
    )
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* Top */}
        <div className="">
            <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 bg-red-200 w-full md:w-auto">
                <TableSearch/>
                <div className="flex items-center gap-4 self-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        <Image src="/filter.png" alt="" width={14} height={14}/>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        <Image src="/sort.png" alt="" width={14} height={14}/>
                    </button>
                    {role==="admin" &&
                       <FormModal table="exam" type="create" />
                    }
                </div>
            </div>
        </div>
        {/* List */}
        <div className="">
            <Table columns={columns} renderRow={renderRow} data={exam}/>
        </div>

        {/* Pagination */}
        <Pagination/>
     
    </div>
  )
}

export default ExamListpage;
