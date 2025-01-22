// import { useEffect, useState } from "react";

// type Attendance ={

// }

// const Attendance = () => {
//   const [students, setStudents] = useState([]);
//   const [attendanceData, setAttendanceData] = useState({});
//   const [date, setDate] = useState("");

//   useEffect(() => {
//     // Fetch student list
//     fetch("/api/attendance/students")
//       .then((res) => res.json())
//       .then((data) => setStudents(data));
//   }, []);

//   const handleAttendanceChange = (studentId, status) => {
//     setAttendanceData((prev) => ({
//       ...prev,
//       [studentId]: status,
//     }));
//   };

//   const handleSubmit = async () => {
//     const dataToSend = students.map((student) => ({
//       StudentId: student.StudentId,
//       AttendanceDate: date,
//       Status: attendanceData[student.StudentId] || "Absent", // Default to Absent
//       TeacherId: 1, // Replace with logged-in teacher ID
//       Remarks: "",
//     }));

//     await fetch("/api/attendance/post-attendance", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(dataToSend),
//     });
//     alert("Attendance submitted successfully!");
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Post Attendance</h1>
//       <div className="mb-4">
//         <label className="block text-sm font-medium">Select Date:</label>
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="mt-1 block w-full p-2 border rounded-md"
//         />
//         </div>

//       <table className="table-auto w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 px-4 py-2">Name</th>
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.StudentId} className="hover:bg-gray-100">
//               <td className="border border-gray-300 px-4 py-2">kmkmk</td>
//               <td className="border border-gray-300 px-4 py-2">kmkmk</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <select
//                   value={attendanceData[student.StudentId] || "Absent"}
//                   onChange={(e) =>
//                     handleAttendanceChange(student.StudentId, e.target.value)
//                   }
//                   className="p-1 border rounded-md"
//                 >
//                   <option value="Present">Present</option>
//                   <option value="Absent">Absent</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         onClick={handleSubmit}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//       >
//         Submit Attendance
//       </button>
//     </div>
//   );
// };

// export default Attendance;
