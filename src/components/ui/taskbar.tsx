"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../Logout";

const Taskbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Main", href: "/main" },
    { name: "Settings", href: "/about" },
  ];
  return (
    <div className="fixed top-0 right-0 left-0 z-50 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-[910%] items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">

          

          <div className="flex gap-2 md:gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <button
                    className={`rounded-md border-b-2 px-2 py-1 text-xs font-medium transition-all md:px-4 md:py-2 md:text-base ${
                      isActive
                        ? "border-white text-white"
                        : "border-transparent text-gray-400 hover:text-white"
                    } cursor-pointer hover:bg-gray-700`}
                  >
                    {item.name}
                  </button>
                </Link>
              );
            })}
          </div>

        </div>
            <div className="text-lg font-semibold text-gray-700">
            <LogoutButton />
          </div>
      </div>
    </div>
  );
};

export default Taskbar;
