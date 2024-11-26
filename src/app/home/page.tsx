"use client";
import { useSession } from "next-auth/react";
import React from "react";
import NavBar from "@/components/shared/NavBar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
export default function DashBoard() {
  const session = useSession();

  return (
    <div className="min-h-screen h-full w-full fixed inset-0 flex flex-col bg-gradient-to-b from-gray-800 to-blue-950">
      <NavBar />

      <div className=" m-auto flex justify-center items-center bg-gray-700 w-3/4 h-3/4 ">
        <div
          className="backdrop-blur-sm  flex flex-col justify-center items-center   bg-white/30  /* Changed from bg-white to add transparency */ m-5 rounded-lg w-3/4 h-4/5" >
          <h1 className="text-xl text-wrap">lun</h1>
          <h1 className="text-xl text-wrap">lun</h1>
          <h1 className="text-xl text-wrap">lun</h1>
          <h1 className="text-xl text-wrap">lun</h1>
          <Loader2 className="animate-spin scroll-smooth h-6 w-6 mx-16 "/>
        
        </div>
      </div>
    </div>
  );
}
