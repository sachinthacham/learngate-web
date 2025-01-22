"use client";

import ClassCard from "@/components/ClassCard";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Use useParams for dynamic segments
import axios from "axios";
import FormModal from "@/components/FormModal";
import { role } from "@/lib/data";

type getClass = {
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

const ClassListpage = () => {
  const [classes, setClasses] = useState<getClass[]>([]);
  const { gradeId } = useParams(); // Extract gradeId using useParams
  const router = useRouter();
  useEffect(() => {
    if (gradeId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5282/api/class/getbyGradeId/${gradeId}`
          );
          console.log(response.data);
          setClasses(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [gradeId]);

  // src\app\dashboard\list\classes\[gradeId]\page.tsx
  const handleClassClick = (classId: number) => {
    router.push(`${gradeId}/classDashboard/${classId}`);
  };

  //src\app\dashboard\list\classes\[gradeId]\subjects\[classId]\page.tsx
  return (
    <div>
      <h1>Classes</h1>
      <div className="flex justify-end">
        {role === "Admin" && <FormModal table="class" type="create" />}
      </div>

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-6xl">
          {classes.map((item, i) => (
            <div key={i} onClick={() => handleClassClick(item.id)}>
              <ClassCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassListpage;
