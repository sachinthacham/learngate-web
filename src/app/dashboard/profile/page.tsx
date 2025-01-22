"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function UserProfile() {
  const { user } = useUser();

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full px-24 py-12">
        <div className="flex items-center space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src="/profileImage.jpg"
              alt="Student Profile"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
          {/* Basic Details */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user?.name} {user?.surname}
            </h1>
          </div>
        </div>
        <hr className="my-6 border-gray-200" />
        {/* Details Section */}
        <div className="space-y-4 flex flex-col gap-4">
          <div className="flex justify-between gap-32 ">
            <div className="flex flex-col border-b-[2px] border-black border-opacity-30 w-[45%] gap-2">
              <p className="text-[#00509d] font-semibold opacity-50">
                First Name
              </p>
              <p className="text-gray-800 text-xl">{user?.name}</p>
            </div>
            <div className="flex flex-col border-b-[2px] border-black border-opacity-30 w-[45%] gap-2">
              <p className="text-[#00509d] font-semibold opacity-50">
                Last Name
              </p>
              <p className="text-gray-800 text-xl">{user?.surname}</p>
            </div>
          </div>
          <div className="flex justify-between gap-32 ">
            <div className="flex flex-col border-b-[2px] border-black border-opacity-30  w-[45%] gap-2">
              <p className="text-[#00509d] font-semibold opacity-50">Address</p>
              <p className="text-gray-800 text-xl">{user?.address}</p>
            </div>
            <div className="flex flex-col border-b-[2px] border-black border-opacity-30 w-[45%] gap-2">
              <p className="text-[#00509d] font-semibold opacity-50">Phone</p>
              <p className="text-gray-800 text-xl">{user?.phone}</p>
            </div>
          </div>
          <div className="flex justify-between gap-32">
            <div className="flex flex-col border-b-[2px] border-black border-opacity-30 w-[45%] gap-2">
              <p className="text-[#00509d] font-semibold opacity-50">Email</p>
              <p className="text-gray-800 text-xl">{user?.email}</p>
            </div>
            <div className="flex flex-col border-b-[2px] border-black border-opacity-30 w-[45%] gap-2">
              <p className="text-[#00509d] font-semibold opacity-50">
                Blood Type
              </p>
              <p className="text-gray-800 text-xl">{user?.bloodType}</p>
            </div>
          </div>
          <div className="flex justify-between gap-32">
            <div className="flex flex-col border-b-[2px] border-black border-opacity-30 w-[45%] gap-2">
              <p className="text-[#00509d] font-semibold opacity-50">Sex</p>
              <p className="text-gray-800 text-xl">
                {user?.sex == 0 ? "Male" : "Female"}
              </p>
            </div>
            <div className="flex flex-col border-b-[2px] border-black border-opacity-30 w-[45%] gap-2">
              <p className="text-[#00509d] font-semibold opacity-50">
                Parent's Name
              </p>
              <p className="text-gray-800 text-xl"> Doe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
