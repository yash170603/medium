// "use client";
// import { useSession } from "next-auth/react";
// import React from "react";
// import NavBar from "@/components/shared/NavBar";
// import { AuroraBackground } from "@/components/ui/aurora-background";
// import { motion } from "framer-motion";
// import { Loader2 } from "lucide-react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import CardDemo from "@/components/blocks/cards-demo-1";
// import { Card } from "@/components/ui/card";

// const fetchBlogs = async () => {
//   const { data } = await axios.get("/api/getAll");
//   return data.response;
// };
// export default function DashBoard() {
//   const {
//     data: blogs,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["blogs"],
//     queryFn: fetchBlogs,
//   });

//   console.log("this is the blogs firm line 20", blogs);
//   if (isLoading) return <p>Loading blogs...</p>;
//   if (error) return <p>Something went wrong {error.message}</p>;
//   return (
//     <div className="min-h-screen h-full w-full fixed inset-0 flex flex-col bg-gradient-to-b from-gray-800 to-blue-950">
//       <NavBar />

//       <div className=" m-auto flex justify-center items-center bg-gray-700 w-3/4 h-3/4 ">
//         <div className="backdrop-blur-sm  flex flex-col justify-center items-center   bg-white/30  /* Changed from bg-white to add transparency */ m-5 rounded-lg w-3/4 h-4/5">

//           <div>
//             <h1>Latest Blogs</h1>
//             <ul>
//               {blogs?.map((blog: any) => (
//                 <li key={blog.id}>
//                   <h2>{blog.title}</h2>
//                   <p>{blog.content}</p>
//                   <small>By {blog.author.name}</small>
//                 </li>
//               ))}
//             </ul>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
// 'use client'

// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"
// import { Loader2 } from 'lucide-react'
// import NavBar from "@/components/shared/NavBar"
//  import CardDemo from "@/components/blocks/cards-demo-2"
// import { cn } from "@/lib/utils"

// const fetchBlogs = async () => {
//   const { data } = await axios.get("/api/getAll")
//   return data.response
// }

// export default function DashBoard() {
//   const {
//     data: blogs,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["blogs"],
//     queryFn: fetchBlogs,
//   })

//   return (
//     <div className="min-h-screen  h-full w-full bg-gradient-to-b from-gray-800 to-blue-950">
//       <NavBar />

//       <div className="container mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold text-white mb-6">Latest Blogs</h1>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 className="h-8 w-8 animate-spin text-white" />
//           </div>
//         ) : error ? (
//           <p className="text-red-500 text-center">Something went wrong: {error.message}</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs?.map((blog: any) => (
//                 <div className="max-w-xs w-full group/card">
//                 <div
//                   className={cn(
//                     " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
//                     "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
//                   )}
//                 >
//                   <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
//                   <div className="flex flex-row items-center space-x-4 z-10">
//                     {/* <Image
//                       height="100"
//                       width="100"
//                       alt="Avatar"
//                       src="/manu.png"
//                       className="h-10 w-10 rounded-full border-2 object-cover"
//                     /> */}
//                     <div className="flex flex-col">
//                       <p className="font-normal text-base text-gray-50 relative z-10">
//                         {blog.author.name}
//                       </p>
//                       <p className="text-sm text-gray-400">{ new Date( blog.createdAt).toLocaleDateString() }</p>
//                     </div>
//                   </div>
//                   <div className="text content">
//                     <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
//                       {blog.title}
//                     </h1>
//                     <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
//                        {blog.content}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import NavBar from "@/components/shared/NavBar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Vortex } from "@/components/ui/vortex";
import Link from "next/link";

const fetchBlogs = async () => {
  const { data } = await axios.get("/api/getAll");
  return data.response.sort((a:any,b:any)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export default function DashBoard() {
  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  });
       
  return (
   
      <div className="min-h-screen h-full w-full bg-gradient-to-b from-gray-800 to-blue-950">
        <NavBar />

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-6">Latest Blogs</h1>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">
              Something went wrong: {error.message}
            </p>
          ) : (
            <div className="space-y-5 p-3">
              {blogs?.map((blog: any) => (
                
                <div key={blog.id} className=" mx-28 w-3/4 group/card">

                   <Link href={`/blog/${blog.id}`}>
                  <div
                    className={cn(
                      "cursor-pointer overflow-hidden relative card h-48 rounded-md shadow-xl flex flex-col justify-between p-4",
                      "bg-[url(https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80)] bg-cover"
                    )}
                  >
                    <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
                    <div className="flex flex-row items-center space-x-4 z-10">
                      <Image
                        height="40"
                        width="40"
                        alt="Avatar"
                        src="/placeholder.svg"
                        className="h-10 w-10 rounded-full border-2 object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="font-normal text-base text-gray-50 relative z-10">
                          {blog.author.name}
                        </p>
                        <p className="text-sm text-gray-300">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text content">
                      <h2 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10 mb-2">
                        {blog.title}
                      </h2>
                      <p className="font-normal text-sm text-gray-50 relative z-10 line-clamp-2">
                        {blog.content.length>50?blog.content.substring(0,100) + "...":blog.content}
                      </p>
                    </div>
                  </div>
                   </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
  
  );
}
