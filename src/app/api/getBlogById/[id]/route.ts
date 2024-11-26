import { prisma } from "@/lib/prisma";
import { Stats } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET( req:NextRequest,{params}:{params:{id:string}}) {
           try {
                 
                const {id} = await params;
               const blog = await prisma.post.findUnique({
                where:{
                    id:id
                }
               })
               if( ! blog) return NextResponse.json({message:"Blog not found"},{status:404})
               return NextResponse.json( 
            {
                blogResponse:blog,
                message:"Blog fetched successfully"
            },{status:200})
           } catch (error) {
            console.log(error)
            return NextResponse.json({message:"There was an error fetching the particular blog"},{status:500})
           }
            
}