"use client";

import FormModal from "@/components/FormModal";
import SubjectCard from "@/components/SubjectCard";
import { role, fetchSubjectData } from "@/lib/data";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ClassSubject = {
  classSubjectId: number;
  subject: {
    id: number;
    name: string;
  };
  teacher: {
    id: number;
    name: string;
    surname: string;
  };
  class: {
    id: number;
    name: string;
  };
};

const SubjectListpage = () => {
  const [subject, setSubject] = useState<ClassSubject[]>([]);
  const { classId } = useParams();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5282/api/ClassSubjects/getSubjects/${classId}`
        );
        console.log(response.data);
        setSubject(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [classId]);

  const handleSubjectClick = (classSubjectId: number) => {
    router.push(`subjects/lessons/${classSubjectId}`);
  };
  return (
    <div>
      <div className=" bg-[#cbf3f0]">
        <h1 className="ml-[150px]  text-[30px] px-2">Subjects</h1>
      </div>
      <div className="flex justify-end mr-[100px]">
        {role === "Admin" && <FormModal table="subject" type="create" />}
      </div>

      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-6xl">
          {subject.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSubjectClick(item.classSubjectId)}
            >
              <SubjectCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectListpage;
