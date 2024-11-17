"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserBlogs(){
      return (<div>
         
         <Link href={"/userBlogs"} className="bg-black text-white hover:bg-slate-800 hover:text-wrap">
         <Button >
           Your Blogs!
          </Button>
       </Link>
       
       </div>
       )
}