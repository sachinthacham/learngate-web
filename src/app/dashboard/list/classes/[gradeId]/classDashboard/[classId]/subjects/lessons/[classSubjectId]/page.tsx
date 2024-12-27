"use client";

import LessonCard from "@/components/LessonCard";
import SubjectCard from "@/components/SubjectCard";
import { role, fetchSubjectData } from "@/lib/data";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Lesson = {
  classSubjectId: number;
  classSubject: {};
  id: number;
  name: string;
};

const LessonListpage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { classSubjectId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5282/api/lesson/getlessons/${classSubjectId}`
        );
        console.log(response.data);
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [classSubjectId]);

  return (
    <div>
      <h1 className="ml-[50px] text-[#3c6e71] text-[30px] font-bold mb-[20px]">
        Lessons
      </h1>
      <div className="min-h-screen bg-gray-100 ml-6">
        <div className="flex flex-col gap-3">
          {lessons.map((item, i) => (
            <div key={i}>
              <LessonCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LessonListpage;
