"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import DeleteBlog from "@/components/shared/deleteBlog";
import Error from "@/app/error/page";
import { toast } from "@/hooks/use-toast";

interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export default function BlogPage() {
  const params = useParams();
  const blogId = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/getBlogById/${blogId}`);

        setBlog(res.data.blog);
        console.log(`this is the whole response`, res);
        console.log(`this is the line 32 blog`, res.data.blog);
      } catch (error: any) {
        console.log(`this is the error line 35`, error);
        if (error.response.status == 500) {
          toast({
            title: "Error",
            description: "Internal server error",
            variant: "destructive",
            className: "bg-gray-800 text-white border-white",
          });
        } else {
          toast({
            title: "Error",
            description:
              error.response?.status === 404
                ? "The blog you are looking for does not exist"
                : "Failed to load blog post",
            variant: "destructive",
            className: "bg-gray-800 text-white border-white",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (isLoading) return <BlogSkeleton />;
  if (!blog)
    return (
      <p className="min-h-screen flex items-center justify-center bg-blue-950 text-white">
        Blog not found!
      </p>
    );
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className=" min-h-svh max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-300">{blog.title}</h1>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-700 px-6 py-3 flex justify-between items-center">
            <span className="text-sm text-gray-300">Content</span>
            <DeleteBlog params={{ id: blog.id }}></DeleteBlog>
          </div>
          <ScrollArea className="h-[calc(100vh-10rem)] scroll-smooth">
            <pre className="p-6 text-base leading-relaxed whitespace-pre-wrap break-words">
              {blog.content}
            </pre>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <Skeleton className="h-10 w-4/5 bg-gray-700 mb-6" />
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="bg-gray-700 px-6 py-3 flex justify-between items-center">
            <Skeleton className="h-5 w-28 bg-gray-600" />
            <Skeleton className="h-5 w-36 bg-gray-600" />
          </div>
          <div className="p-6">
            <Skeleton className="h-5 w-full bg-gray-700 mb-3" />
            <Skeleton className="h-5 w-full bg-gray-700 mb-3" />
            <Skeleton className="h-5 w-4/5 bg-gray-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
