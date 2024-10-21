"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";

const schema = z.object({
    username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!"})
    .max(20, { message: "Username must be at most 20 characters long!"}),
    email: z
    .string()
    .email({message:"Invalid email address!"}),
    password:z
    .string()
    .min(8, {message:"password must be at least 8 characters!"}),
    firstName:z
    .string()
    .min(1,{message:"First name is required"}),
    lastName:z
    .string()
    .min(1,{message:"Last name is required"}),
    bloodType:z
    .string()
    .min(1,{message:"Blood Type is required"}),
    phone:z
    .string()
    .min(1,{message:"Phone number is required"}),
    address:z
    .string()
    .min(1,{message:"Address is required"}),
    birthday:z
    .date({message:"Birthday is required"}),
    sex:z
    .enum(["male", "female"],{message:"Sex is required"}),
    img:z
    .instanceof(File,{message:"Image is required"}),

  });

  type Inputs = z.infer<typeof schema>;

const TeacherForm = ({type,data}:{type:"create"|"update";data?:any}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({
        resolver: zodResolver(schema),
      });

      const onsubmit = handleSubmit((data) => {
        console.log(data);
       })
      
    return (
    <form className="flex flex-col gap-8" onSubmit={onsubmit}>
        <h1 className="text-xl font-semibold">Create a new teacher</h1>
        <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
            <InputField label="Username"   register={register} name="username" defaultValue={data?.username} error={errors?.username}/>
            <InputField label="Email"      register={register} name="email"    defaultValue={data?.email}    error={errors?.email}    type="email" />
            <InputField label="Password"   register={register} name="password" defaultValue={data?.password} error={errors?.password} type="password" />
        <span className="text-xs text-gray-400 font-medium flex">Personal Information</span>
        <div className="flex justify-between flex-wrap gap-4">
            <InputField label="First name" register={register}  name="firstName" defaultValue={data?.firstName}  error={errors?.firstName}/>
            <InputField label="Last name"  register={register}  name="lastName"  defaultValue={data?.lastName}   error={errors?.lastName}/>
            <InputField label="Phone"      register={register}  name="phone"     defaultValue={data?.phone}      error={errors?.phone}/>
            <InputField label="Blood Type" register={register}  name="bloodType" defaultValue={data?.bloodType}  error={errors?.bloodType}/>
            <InputField label="Address"    register={register}  name="address"   defaultValue={data?.address}    error={errors?.address} />
            <InputField label="BirthDay"   register={register}  name="birthday"  defaultValue={data?.birthday}   error={errors?.birthday} type="date"/>
        </div>
        
        <button className="bg-blue-400 text-white p-2 rounded-md">{type==="create"? "create" : "update"}</button>
    </form>
  )
}

export default TeacherForm;
