import Link from "next/link";

import { getServerSession } from "next-auth";
import { authConfig } from "~/server/auth/config";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const user = "anon"
  const hello = await api.post.hello({ text: `${user}` });
  const session = await getServerSession(authConfig);

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
          <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 bg-gray-100 text-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold">🧠 AI Agent T3 App</h1>
        <p className="mt-2 text-lg text-gray-600">
          {hello?.greeting || "Loading..."}
        </p>
      </div>

      <div className="text-center">
        {session?.user ? (
          <>
            <p className="text-green-600">
              Logged in as <strong>{session.user.name ?? "Unknown"}</strong>
            </p>
            <Link
              href="/planner"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
            >
              Go to Planner
            </Link>
          </>
        ) : (
          <>
            <p className="text-red-500">You are not logged in.</p>
            <Link
              href="/api/auth/signin"
              className="mt-4 inline-block rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 transition"
            >
              Sign in
            </Link>
          </>
        )}
      </div>
    </main>
    </HydrateClient>
  );
}
