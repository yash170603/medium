"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { Vortex } from "@/components/ui/vortex";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export default function UserBlog() {
  const [myBlogs, setMyBlogs] = useState<Blog[]>([]);
  const { data: session } = useSession();
  const authorId = session?.user?.id;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/myBlogs?authorId=${authorId}`);
        setMyBlogs(response.data.response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    if (authorId) {
      fetchBlogs();
    }
  }, [authorId]);

  return (
    <div className="min-h-screen  ">
      <Vortex className="min-h-screen h-full w-full">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white dark:text-black">
              Your Blogs!
            </h1>
            <Link href={"/createBlogPage"}>
              <Button className="flex items-center space-x-2">
                <PlusCircle className="h-5 w-5" />
                <span>New Blog</span>
              </Button>
            </Link>
          </div>
          { (myBlogs == null || myBlogs.length === 0) ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                No blogs yet
              </h2>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Start writing your first blog post!
              </p>
            </div>
          ) : (
            <HoverEffect
              items={myBlogs.map((blog) => ({
                title: blog.title,
                description:
                  blog.content.length > 50
                    ? blog.content.substring(0, 20) + "..."
                    : blog.content,
                link: `/blog/${blog.id}`,
              }))}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            />
          )}
        </div>
      </Vortex>
    </div>
  );
}
