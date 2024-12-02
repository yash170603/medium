"use client";
import React from "react";
import CreateBlog from "./createBlog";
import Logout from "./logOut";
import UserBlogs from "./userBlog.button";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const session = useSession();
  return (
    <div>
      <nav
        className="flex justify-between  gap-4 p-2 
        bg-gradient-to-br from-blue-400 via-blue-600 to-purple-700/50
        hover:from-black hover:via-blue-950 hover:to-black
        transition-all duration-500 ease-in-out
        hover:shadow-md hover:shadow-blue-500/50"
      >
        <UserBlogs />
        <CreateBlog />
         <div className="gap-2 flex items-center ">
          <p className="font-bold">Welcome {session.data?.user?.name}!</p>
          <div>
          {session.data?.user && <Logout />}
          </div>
          
         </div>
      
      </nav>
    </div>
  );
}
