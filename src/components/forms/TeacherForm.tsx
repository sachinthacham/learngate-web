import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import z from "zod";
import { useEffect, useState } from "react";
import InputField from "../InputField";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long!" }),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  img: z.string().min(4, { message: "Image is required" }),
  sex: z
    .number()
    .min(0, { message: "Invalid sex value!" })
    .max(1, { message: "Invalid sex value!" }),
  parentId: z.number().min(1, { message: "Parent is required" }),
  classId: z.number().min(1, { message: "Class is required" }),
  gradeId: z.number().min(1, { message: "Grade is required" }),
  roles: z
    .array(z.string())
    .min(1, { message: "At least one role is required" }),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  // Fetch classes and grades
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [classRes, gradeRes] = await Promise.all([
          axios.get("http://localhost:5282/api/class/getAll"), // Replace with your API endpoint
          axios.get("http://localhost:5282/api/grade/getAll"), // Replace with your API endpoint
        ]);

        setClasses(classRes.data);
        setGrades(gradeRes.data);
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
    };
    fetchOptions();
  }, []);

  // Handle form submission
  const onSubmit = async (formData: Inputs) => {
    try {
      const formDataWithRoles = { ...formData, roles: ["Student"] };
      const API_ENDPOINT = "http://localhost:5282/api/Auth/studentRegister"; // Replace with your API URL
      const response = await axios.post(API_ENDPOINT, formData);

      console.log("Response:", response.data); // Handle successful response
      alert(
        type === "create"
          ? "Teacher created successfully!"
          : "Teacher updated successfully!"
      );
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message); // Handle error response
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new teacher" : "Update teacher details"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          register={register}
          name="username"
          defaultValue={data?.username}
          error={errors?.username}
        />
        <InputField
          label="Email"
          register={register}
          name="email"
          defaultValue={data?.email}
          error={errors?.email}
          type="email"
        />
        <InputField
          label="Password"
          register={register}
          name="password"
          defaultValue={data?.password}
          error={errors?.password}
          type="password"
        />
      </div>
      <span className="text-xs text-gray-400 font-medium flex">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First name"
          register={register}
          name="name"
          defaultValue={data?.name}
          error={errors?.name}
        />
        <InputField
          label="Last name"
          register={register}
          name="surname"
          defaultValue={data?.surname}
          error={errors?.surname}
        />
        <InputField
          label="Phone"
          register={register}
          name="phone"
          defaultValue={data?.phone}
          error={errors?.phone}
        />
        <InputField
          label="Blood Type"
          register={register}
          name="bloodType"
          defaultValue={data?.bloodType}
          error={errors?.bloodType}
        />
        <InputField
          label="Address"
          register={register}
          name="address"
          defaultValue={data?.address}
          error={errors?.address}
        />
        <InputField
          label="Image URL"
          register={register}
          name="img"
          defaultValue={data?.img}
          error={errors?.img}
        />
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-500">Sex</label>
        <select
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("sex", { valueAsNumber: true })}
          defaultValue={data?.sex !== undefined ? data.sex : ""}
        >
          <option value="">Select sex</option>
          <option value={0}>Male</option>
          <option value={1}>Female</option>
        </select>
        {errors.sex && (
          <p className="text-xs text-red-400">{errors.sex.message}</p>
        )}
      </div>
      {/* Parent, Class, and Grade Select Fields */}
      {/* Add appropriate dropdown fields */}
      <select
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...register("gradeId", {
          valueAsNumber: true, // Automatically converts to number
        })}
        defaultValue={data?.gradeId || ""}
      >
        <option value="">Select a grade</option>
        {grades.map((grade: any) => (
          <option key={grade.id} value={grade.id}>
            {grade.level}
          </option>
        ))}
      </select>
      {errors.gradeId && (
        <p className="text-xs text-red-400">{errors.gradeId.message}</p>
      )}
      <select
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...register("classId", {
          valueAsNumber: true, // Automatically converts to number
        })}
        defaultValue={data?.classId || ""}
      >
        <option value="">Select a class</option>
        {classes.map((cls: any) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>
      {errors.classId && (
        <p className="text-xs text-red-400">{errors.classId.message}</p>
      )}
      <select
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...register("parentId", {
          valueAsNumber: true, // Automatically converts to number
        })}
        defaultValue={data?.parentId || ""}
      >
        <option value="">Select a parent</option>
        {classes.map((cls: any) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>
      {errors.parentId && (
        <p className="text-xs text-red-400">{errors.parentId.message}</p>
      )}

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default TeacherForm;
