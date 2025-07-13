"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Taskbar from "~/components/ui/taskbar";

export default function MainPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hey! What subject do you need help with today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: `I see! Let me help with: "${input}"` },
      ]);
    }, 500);
  };

  return (
    <>
      <Taskbar />
      <main className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col pt-24 px-4">
          <h1 className="text-center text-3xl font-bold mb-6">
            Hello {session?.user?.name?.split(" ")[0] || "Student"}
          </h1>

          <div className="flex-1 overflow-y-auto p-4 rounded-lg mb-4 shadow-md">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-700 text-white self-end ml-auto"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              className="flex-1 rounded-lg p-3 bg-gray-700 text-white border border-gray-600 focus:outline-none"
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 
              py-2 rounded-lg"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
