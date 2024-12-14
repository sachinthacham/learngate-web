"use client";
import { role } from "@/lib/data";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const { classId } = useParams();
  const router = useRouter();

  const cardArray = [
    { id: 1, name: "subjects", url: "/subject.jpg" },
    { id: 2, name: "attendance", url: "/attendance.jpeg" },
    { id: 3, name: "announcements", url: "/announcement.jpeg" },
    { id: 4, name: "results", url: "/result.jpg" },
    { id: 5, name: "events", url: "/event.jpeg" },
    { id: 6, name: "exams", url: "/exam.jpg" },
    { id: 7, name: "students", url: "/student.jpeg" },
  ];

  const handleClassDashboard = (cardName: string) => {
    router.push(`${classId}/${cardName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#006d77] mb-8">
        Class Dashboard
      </h1>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        {cardArray.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClassDashboard(card.name)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white  shadow-md rounded-[20px] flex items-center justify-center cursor-pointer h-40 w-full hover:shadow-xl transform hover:scale-105 transition-transform duration-300 bg-cover"
            style={{
              backgroundImage: `url(${card.url})`,
              borderRadius: "20px",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-[20px]"></div>
            <h2 className="text-xl sm:text-xl font-medium font-sans z-20 text-white">
              {card.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
