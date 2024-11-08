// Logout.tsx
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from 'react'

export default function Logout() {
  return (
    <Button 
      onClick={() => signOut({callbackUrl:'/'})} 
      className="bg-blue-500 text-white hover:bg-black hover:text-violet-400"
    >
      Logout
      <div>
        <LogOut />
      </div>
    </Button>
  )
}