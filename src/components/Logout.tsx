"use client";
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/" })} 
    className="rounded-md md:text-xl text-[15px] bg-gray-600 px-[10px] py-[-10px] text-white 
    hover:bg-blue-700 transition duration-200 cursor-pointer">
      Logout
    </button>
  );
}
