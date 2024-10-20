import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, studentsData} from "@/lib/data";
import Image from 'next/image'
import Link from "next/link";

type Student = {
    id:number;
    studentId:string;
    name:string;
    email?:string;
    phone?:string;
    photo:string;
    grade:number;
    class:string;
    address:string;
}

const columns = [
    {
     header:"Info",
     accessor: "info"
    },
    {
     header:"Student ID",
     accessor : "studentId",
     className: "hidden md:table-cell"
    },
    {
     header:"Grade",
     accessor: "grade",
     className: "hidden md:table-cell"
    },
  
    {
    header:"Phone",
    accessor: "phone",
    className: "hidden lg:table-cell"
    },
    {
    header:"Address",
    accessor: "address",
    className: "hidden lg:table-cell"
    },
    {
    header:"Actions",
    accessor: "actions",
    className: "hidden md:table-cell"
    },

]
const StudentListpage = () => {
    const renderRow = (item:Student) => (
        <tr key={item.id} className="norder-b border-gray-200 even:bg-slate-50 hover:bg-lamaPurpleLight">
            <td className="flex items-center gap-4 p-4">
                <Image src={item.photo} alt="" width={40} height={40} className = "md:hidden xl:block w-10 h-10 rounded-full object-cover"/>
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <h4 className="text-xs text-gray-500">{item.class}</h4>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.studentId}</td>
            <td className="hidden md:table-cell">{item.grade}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    <Link href={`/dashboard/list/teachers/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                            <Image src="/view.png" alt="" width={16} height={16}/>
                        </button>
                    </Link>
                    {role === "admin" && (
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                            <Image src="/view.png" alt="" width={16} height={16}/>
                        </button>
                    )}
                </div>
            </td>
        </tr>
    )
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
        {/* Top */}
        <div className="">
            <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
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
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
                        <Image src="/plus.png" alt="" width={14} height={14}/>
                    </button>
                     }
                    
                </div>
            </div>
        </div>
        {/* List */}
        <div className="">
            <Table columns={columns} renderRow={renderRow} data={studentsData}/>
        </div>

        {/* Pagination */}
        <Pagination/>
     
    </div>
  )
}

export default StudentListpage;
