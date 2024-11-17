"use client"
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

export default function Logout() {
  return (
    <>
      <Button
          className="bg-black text-white hover:bg-blue-500"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Logout
        <div>
          <LogOut />
        </div>
      </Button>
    </>
  );
}
