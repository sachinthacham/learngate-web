import { useEffect, useState } from "react";
import { fetchTeacherNames } from "@/lib/data";

type Teacher = {
  id: number;
  name: string;
  surname: string;
};

const ClassForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: {
    id: number;
    name: string;
    capacity: number;
    gradeId: number;
    supervisorId: number;
  };
}) => {
  const [formData, setFormData] = useState({
    id: data?.id || 0,
    name: data?.name || "",
    capacity: data?.capacity || 0,
    gradeId: 1,
    supervisorId: data?.supervisorId || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      const teachers = await fetchTeacherNames();
      setTeachers(teachers);
    };
    fetchTeacher();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5282/api/class/${
          type === "update" ? `update/${formData.id}` : "create"
        }`,
        {
          method: type === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${type} class`);
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
        {type === "create" ? "Create Class" : "Update Class"}
      </h2>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Class Name
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value="sachninth"
          onChange={handleChange}
          placeholder="Enter class name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Capacity Field */}
      <div>
        <label
          htmlFor="capacity"
          className="block text-sm font-medium text-gray-700"
        >
          Capacity
        </label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Enter the capacity"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Supervisor Dropdown */}
      <div>
        <label
          htmlFor="supervisorId"
          className="block text-sm font-medium text-gray-700"
        >
          Supervisor
        </label>
        <select
          id="supervisorId"
          name="supervisorId"
          value={formData.supervisorId}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        >
          <option value="" disabled>
            Select a supervisor
          </option>
          {teachers.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.name}
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

export default ClassForm;
