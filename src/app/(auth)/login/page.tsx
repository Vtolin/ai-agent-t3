"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  useEffect(() => {
    // Optional: If already logged in, redirect elsewhere
    // You can fetch session here and redirect to /dashboard or /
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to AI Agent</h1>
        <p className="mb-6 text-gray-600">Sign in to continue</p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
