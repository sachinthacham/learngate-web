"use client"

import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role} from "@/lib/data";
import Image from 'next/image'
import Link from "next/link";
import {fetchParentData} from '@/lib/data'
import { useEffect, useState } from "react";

type Parent = {
    id:number;
    name:string;
    surname:string;
    email?:string;
    students:[{
        id:number,
        name:string,
        surname:string
    }];
    phone:string;
    address:string;
}

const columns = [
    {
     header:"Info",
     accessor: "info",
     className:"text-left pl-[20px]"
    },
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
    header:"Student Names",
    accessor : "students",
    className: "hidden md:table-cell text-left"
    },
    {
    header:"Actions",
    accessor: "actions",
    className: "hidden md:table-cell text-left"
    },

]
const StudentListpage = () => {
    
    const[ParentData, setParentData] = useState<Parent[]>([]);
    useEffect(() => {
        fetchData();
    },[]);

    const fetchData = async () => {
        const data = await fetchParentData();
        setParentData(data);
    }
    
    const renderRow = (item:Parent) => (
        <tr key={item.id} className="norder-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}{item.surname}</h3>
                    <h4 className="text-xs text-gray-500">{item?.email}</h4>
                </div>
            </td>
            {/* <td className="hidden md:table-cell">{item.students.join(",")}</td> */}
           
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                {
                    item.students.map((student) => (
                        <>
                        <span> {student.name} {student.surname} </span><br/>
                        </>
                    ))
                }
            </td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "Admin" && (
                        <>
                            <FormModal table="parent" type="update" data={item}/>
                            <FormModal table="parent" type="delete" id={item.id}/>
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
            <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
            <div className="flex flex-col md:flex-row items-center gap-4 bg-red-200 w-full md:w-auto">
                <TableSearch/>
                <div className="flex items-center gap-4 self-end">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        <Image src="/filter.png" alt="" width={14} height={14}/>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        <Image src="/sort.png" alt="" width={14} height={14}/>
                    </button>
                    {role==="Admin" &&
                    //     <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                    //     <Image src="/plus.png" alt="" width={14} height={14}/>
                    // </button>
                    <FormModal table="parent" type="create" />
                     }
                    
                </div>
            </div>
        </div>
        {/* List */}
        <div className="">
            <Table columns={columns} renderRow={renderRow} data={ParentData}/>
        </div>

        {/* Pagination */}
        <Pagination/>
     
    </div>
  )
}

export default StudentListpage;
