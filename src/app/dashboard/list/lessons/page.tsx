"use client"

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {fetchLessonData, role} from "@/lib/data";
import Image from 'next/image'
import { useState,useEffect } from "react";

type Lesson = {
    id:number;
    name:string;
    subject:{
        id:number,
        name:number
    };
    class:{
        id:number,
        name:string
    };
    teacher:{
        id:number,
        name:string
    }
    startTime:string;
    endTime:string
    day:number

   
    
}

const columns = [
    {
     header: "Lesson Name",
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
    header:"Actions",
    accessor: "actions",
    },

]
const LessonListpage = () => {

    const[lesson, setLesson] = useState<Lesson[]>([]);
    useEffect(()=> {
        const fetchData = async () => {
            const data = await fetchLessonData();
            setLesson(data);
        }
        fetchData();
    },[]);
    const renderRow = (item:Lesson) => (
        <tr key={item.id} className="norder-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">{item.name}</td>
            <td>{item.subject.name}</td>
            <td className="hidden md:table-cell">{item.teacher.name}</td>
            <td className="hidden md:table-cell">{item.class.name}</td>
            <td className="hidden md:table-cell">{item.startTime}</td>
            <td className="hidden md:table-cell">{item.endTime}</td>
           
            <td>
                <div className="flex items-center gap-2">
                   
                    {role === "Admin" && (
                        <>
                        <FormModal table="lesson" type="update" data={item}/>
                        <FormModal table="lesson" type="delete" id={item.id}/>
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
            <h1 className="hidden md:block text-lg font-semibold">All Subject</h1>
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
                        <FormModal table="lesson" type="create" />
                    }
                </div>
            </div>
        </div>
        {/* List */}
        <div className="">
            <Table columns={columns} renderRow={renderRow} data={lesson}/>
        </div>

        {/* Pagination */}
        <Pagination/>
     
    </div>
  )
}

export default LessonListpage;
