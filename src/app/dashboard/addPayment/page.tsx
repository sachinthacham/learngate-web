"use client";
import { useState } from "react";

export default function PaymentForm() {
  const [paymentName, setPaymentName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!paymentName || !amount) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5282/api/Payment/PaymentGateway",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentName, amount: parseInt(amount) * 100 }), // Amount in cents
        }
      );
      const { paymentUrl } = await response.json();
      console.log(paymentUrl);
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Payment Form
        </h2>

        <div className="mb-4">
          <label htmlFor="paymentName" className="block text-gray-600 mb-1">
            Payment Name
          </label>
          <input
            type="text"
            id="paymentName"
            value={paymentName}
            onChange={(e) => setPaymentName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter payment name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-600 mb-1">
            Amount (USD)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
}
