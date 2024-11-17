import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { z } from "zod";



export async function DELETE(req:NextRequest,{params}:{params:{id:string}}){
      const {id}= await params;  // this shows a warning without await, idky why, but await helps,,
  
       try {
        const deleteResponse = await  prisma.post.delete({
            where:{
                id:id
            }
        })
         console.log(`this is the deleteapi response`,deleteResponse);
         
         return Response.json({
            message:"Blog deleted successfully",
            deleteResponse,
         },{status:200})
       } catch (error) {
          console.log(error)
          return Response.json({
            message:"Internal sever error",
          },{status:500})
       }
   
}