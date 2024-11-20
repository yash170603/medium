import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    
    try {
        const admin = await auth();
        const sessionId = admin?.user?.id
        const blogId = await params.id;


        // retrieve the blog details
        const blogCreator = await prisma.post.findUnique({
              where:{
                id:blogId
              }
        })

        if( blogCreator?.authorId !== sessionId){
            return NextResponse.json({
                message:"Your are not authenticated to delete this blog",
            },{status:403})
        }

        return NextResponse.json({
           status:200,
        })
    } catch (error) {
          console.log(`this is the checkAuthor error`,error);

          return NextResponse.json({
            message:"Interval server error",
          },{status:500})
          
    }
}