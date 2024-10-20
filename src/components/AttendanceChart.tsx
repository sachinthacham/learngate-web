"use client"
import Image from"next/image"

import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Monday',
    present: 90,
    absent:75
  },
  {
    name: 'Tuesday',
    present: 60,
    absent:52
  },
  {
    name: 'Wednesday',
    present: 75,
    absent:60
  },
  {
    name: 'Thursday',
    present: 80,
    absent:70
  },
  {
    name: 'Friday',
    present: 65,
    absent:40
  },
  
];

const AttendanceChart = () => {
    return(
        <div className='bg-white rounded-lg p-4 h-full'>
            <div className='flex justify-between items-center'>
                <h1 className="text-large font-semibold">Attendance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20}/>
            </div>
            <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
          <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
          <YAxis axisLine={false}  tick={{fill:"#d1d5db"}} tickLine={false} />
          <Tooltip />
          <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}}/>
          <Bar dataKey="present" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} legendType="circle" />
          <Bar dataKey="absent" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} legendType="circle"  />
        </BarChart>
      </ResponsiveContainer>
        </div>
    )
}

export default AttendanceChart;