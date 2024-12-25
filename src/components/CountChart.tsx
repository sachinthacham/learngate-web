"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CountChart = ({
  girlCount,
  boyCount,
  total,
}: {
  girlCount: number;
  boyCount: number;
  total: number;
}) => {
  const data = [
    {
      name: "Total",
      count: total,
      fill: "white",
    },
    {
      name: "Girls",
      count: girlCount,
      fill: "#ffbf69",
    },
    {
      name: "Boys",
      count: boyCount,
      fill: "#2ec4b6",
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* title */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Student</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* chart */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* bottom */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#2ec4b6] rounded-full" />
          <h1 className="font-bold">{boyCount}</h1>
          <h2 className="text-xs text-gray-300">
            Boys {(boyCount / total) * 100}
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-[#ffbf69] rounded-full" />
          <h1 className="font-bold">{girlCount}</h1>
          <h2 className="text-xs text-gray-300">
            Girls {(girlCount / total) * 100}
          </h2>
        </div>
      </div>
    </div>
  );
};
export default CountChart;
