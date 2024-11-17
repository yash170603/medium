"use client"
import { Button } from "@/components/ui/button";
import  Link from "next/link";
import React from "react";

export default function CreateBlog() {
  return (
    <>
    <Link href={"/createBlogPage"}>
      <Button>CreateBlog</Button>
    </Link>
    </>
    
  );
}
