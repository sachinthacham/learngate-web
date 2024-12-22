import { useEffect, useState } from "react";
import { fetchTeacherNames, fetchSubjectNames } from "@/lib/data";
import { useParams } from "next/navigation";

type Teacher = {
  id: number;
  name: string;
  surname: string;
};

type Subject = {
  id: number;
  name: string;
};

const SubjectForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: {
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
}) => {
  const { classId } = useParams();
  const [formData, setFormData] = useState({
    classSubjectId: data?.classSubjectId || 0,
    subjectId: data?.subject.id || "",
    teacherId: data?.teacher.id || "",
    classId: classId || data?.class.id || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    console.log("Class ID is:", classId);
    const fetchTeacher = async () => {
      const teachers = await fetchTeacherNames();
      setTeachers(teachers);
    };
    const fetchSubject = async () => {
      const subjects = await fetchSubjectNames();
      setSubjects(subjects);
    };
    fetchTeacher();
    fetchSubject();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        classSubjectId: formData.classSubjectId,
        subjectId: formData.subjectId,
        teacherId: formData.teacherId,
        classId: formData.classId, // Ensure classId is included
      };

      const response = await fetch(
        `http://localhost:5282/api/ClassSubjects/${
          type === "update" ? `update/${formData.classSubjectId}` : "create"
        }`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${type} subject`);
      }

      const result = await response.json();
      console.log("Success:", result);

      // Optionally close the modal or refresh the list
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800">
        {type === "create" ? "Create Subject" : "Update Subject"}
      </h2>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Subject Dropdown */}
      <div>
        <label
          htmlFor="subjectId"
          className="block text-sm font-medium text-gray-700"
        >
          Subject
        </label>
        <select
          id="subjectId"
          name="subjectId"
          value={formData.subjectId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a Subject
          </option>
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Teacher Dropdown */}
      <div>
        <label
          htmlFor="teacherId"
          className="block text-sm font-medium text-gray-700"
        >
          Teacher
        </label>
        <select
          id="teacherId"
          name="teacherId"
          value={formData.teacherId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a Teacher
          </option>
          {teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.name} {teacher.surname}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-4 w-full py-2 px-4 rounded-md text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        disabled={loading}
      >
        {loading ? "Submitting..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
