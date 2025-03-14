"use client";

import { FormEvent, useState } from "react";
import { checkPassword } from "@/app/actions";
import { useRouter } from "next/navigation";

// NOTE - could reuse this password protection to route
// to other branded pages based on the password entered
export default function PasswordProtection() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await checkPassword(password);
      if (result.success) {
        // Redirect to protected content
        router.push("/netflix");
      } else {
        setError("Incorrect password");
        setPassword("");
        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6">
          Password Required
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {isLoading ? "Checking..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
