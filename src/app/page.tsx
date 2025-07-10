import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "fellows tudents" });
  
  return (

      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 bg-gray-900 text-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold">🧠 AI Agent T3 App</h1>
        <p className="mt-2 text-lg text-gray-300">
          {hello?.greeting || "Loading..."}
        </p>
      </div>

      <div className="text-center">
          <>
            <p className="text-red-500">You are not logged in.</p>
            <Link
              href="/api/auth/signin"
              className="mt-4 inline-block rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition"
            >
              Sign in
            </Link>
          </>
      </div>
    </main>
  );
}
