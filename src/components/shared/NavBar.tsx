"use client"
import React from "react";
import CreateBlog from "./createBlog";
import Logout from "./logOut";
import UserBlogs from "./userBlog.button";
import { useSession } from "next-auth/react";

export default function NavBar() {
  const session = useSession()
  return (
    <div>
      <nav className="flex justify-between items-center gap-4 p-2  bg-gradient-to-br from-purple-300 via-pink-300 to-blue-500">
        <UserBlogs />
        <CreateBlog />
        {session.data?.user && <Logout />}
      </nav>
    </div>
  );
}
