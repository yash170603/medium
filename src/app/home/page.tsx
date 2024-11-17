"use client";
import { useSession } from "next-auth/react";
import React from "react";
import NavBar from "@/components/shared/NavBar";
export default function DashBoard() {
  const session = useSession();
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar/>
      <div className="flex-1 flex items-center justify-center bg-black text-pink-700 text-lg">
      
      </div>

    </div>
  );
}
