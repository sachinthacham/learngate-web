import { useState } from "react";

const AnnouncementForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: { title: string; description: string; classId: number };
}) => {
  const [formData, setFormData] = useState({
    title: data?.title || "",
    description: data?.description || "",
    classId: data?.classId || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "classId" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/announcements/${type === "update" ? "jnj": ""}`, {
        method: type === "create" ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${type} announcement`);
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
        {type === "create" ? "Create Announcement" : "Update Announcement"}
      </h2>

      {/* Error Message */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter the announcement title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter the announcement description"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        ></textarea>
      </div>

      {/* Class ID Field */}
      <div>
        <label htmlFor="classId" className="block text-sm font-medium text-gray-700">
          Class ID
        </label>
        <input
          type="number"
          id="classId"
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          placeholder="Enter the class ID"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-4 w-full py-2 px-4 rounded-md text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        disabled={loading}
      >
        {loading ? "Submitting..." : type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AnnouncementForm;
