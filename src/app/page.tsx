"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

type LoginData = {
  username: string;
  password: string;
};

type DecodedToken = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  exp: number; // Expiration time
  iat: number; // Issued at time
};

export default function LoginForm() {
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clearing previous errors

    try {
      const res = await axios.post(
        "http://localhost:5282/api/Auth/Login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = res.data.jwtToken;
      if (token) {
        // Store the token in localStorage
        localStorage.setItem("jwtToken", token);
        console.log("Login successful. Token stored:", token);

        // Decode the token to extract username
        const decoded: DecodedToken = jwtDecode(token);
        const email =
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ];
        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        console.log("Decoded username:", email);
        console.log("Decoded role : ", role);

        if (role === "Student") {
          const res = await axios.get(
            `http://localhost:5282/api/student/getby/${email}`
          );
          console.log(res.data);

          setUser(res.data);
        } else if (role === "Teacher") {
          const res = await axios.get(
            `http://localhost:5282/api/teacher/getby/${email}`
          );

          setUser(res.data);
        }

        // Redirect user to the dashboard
        router.push("/dashboard/admin");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    //style={{ backgroundImage: 'url("/background.jpg")', }}
    <div className="min-h-screen bg-cover bg-center bg-[#e5e5e5]">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="flex w-full max-w-3xl z-30 bg-white rounded-lg shadow-lg justify-around gap-6">
          <Image
            src="/login.jpg" // Path to the image in the public folder
            alt="signin Image" // Alt text for accessibility
            width={400} // Width of the image (can be set to fit your needs)
            height={350} // Height of the image (can be set to fit your needs)
            // This makes the image responsive
          />

          {/* Right Side: Form */}
          <div className="w-1/2 p-8">
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
              Login
            </h2>

            {error && <div className="mb-4 text-red-500">{error}</div>}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-600"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-semibold text-gray-600"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
