import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
      try {
          const response = await prisma.post.findMany({
            where:{
                published:true
            },
            include:{
                author:{
                    select:{
                        name:true,
                        email:true
                    }
                }
            }
          })
          console.log(`this is get allapi response`,response)
          return Response.json({
            response
          },{status:200})
      } catch (error) {
          console.log(`this is the error at getallBlog api`,error)
          return Response.json({
            message:"Something went wrong"
          },{status:500})
      }
}