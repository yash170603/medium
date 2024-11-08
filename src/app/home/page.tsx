"use client";
import { useSession } from "next-auth/react";
import Logout from "@/context/logOut";
import React from "react";

export default function  DashBoard  () {
  const session = useSession();

  return (
    <div>
      die with a smile
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <h1 className=" bg-pink-700">
        <Logout>
        </Logout>
      </h1>
    </div>
  );
};

