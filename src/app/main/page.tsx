import React from "react";
import Taskbar from "~/components/ui/taskbar";
import LogoutButton from "~/components/Logout";

export default function MainPage() {
    return (
        <>
        <Taskbar />
        <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 bg-gray-900 text-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold">🧠 AI Agent T3 App</h1>
                <p className="mt-2 text-lg text-gray-300">
                    Welcome to the AI Agent T3 App! This is a starter template for building AI-powered applications with Next.js and tRPC.
                </p>
            </div>
        </main>
        </>
    )
}