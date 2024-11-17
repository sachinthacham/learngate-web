"use client"

import { useState } from 'react';
import axios from 'axios';

type User = {
  username: string;
  password: string;
  roles: string[];
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<User>({
    username: '',
    password: '',
    roles: ['Admin']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try {
      const res = await axios.post("http://localhost:5282/api/Auth/Register", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data || "An error occurred");
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="register flex items-center justify-center min-h-screen bg-gray-100" >
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Register</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-600" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold text-gray-600" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  );
}