import Link from "next/link";

export default async function Home() {
  return (

      <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 bg-gray-900 text-gray-100">
      <div className="text-center">
        <h1 className="md:text-4xl text-2xl font-bold">LearnMaxxing with AI Agent</h1>
        
      </div>

      <div className="text-center">
          <>
            <p className="text-red-500">You are not logged in.</p>
            <Link
              href="/api/auth/signin"
              className="mt-4 inline-block rounded-lg bg-blue-800 px-8 py-4 text-white hover:bg-gray-700 transition"
            >
              Get Started - Its free!
            </Link>
            <p className="mt-[20px]">Your personal AI teammate → for class, tests, and slides.</p>
          </>
      </div>
    </main>
  );
}
