"use client";

import { signIn, useSession  } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const {data:session, status} = useSession()
    const router = useRouter()

  useEffect(() => {
        if (status === "authenticated") {
            router.push("/main");
        }
    }, [status, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="rounded-lg bg-white p-8 shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to AI Agent</h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/main" })}
          className="cursor-pointer w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
