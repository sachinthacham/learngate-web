"use client";

import GradeCard from "@/components/GradeCard";
import { fetchGradeData } from "@/lib/data";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Grade = {
  id: number;
  level: number;
};

const GradeListpage = () => {
  const [grade, setGrade] = useState<Grade[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGradeData();
      setGrade(data);
    };
    fetchData();
  }, []);

  const handleGradeClick = (gradeId: number) => {
    router.push(`classes/${gradeId}`);
  };

  return (
    <div>
      <h1>Grades</h1>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-6xl">
          {grade.map((item, i) => (
            <div key={i} onClick={() => handleGradeClick(item.id)}>
              <GradeCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradeListpage;
