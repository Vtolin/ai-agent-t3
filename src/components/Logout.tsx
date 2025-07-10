"use client";
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} 
    className="rounded-md bg-gray-600 px-2 py-1 text-white hover:bg-blue-700 transition duration-200 cursor-pointer">
      Logout
    </button>
  );
}
