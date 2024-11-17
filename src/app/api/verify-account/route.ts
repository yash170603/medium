import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";
import { NextRequest } from "next/server";
import { use } from "react";

export async function PUT(req:NextRequest){
       try {
         const currentUserSession= await auth();
          const userId = currentUserSession?.user?.id

          const checkUser = await prisma.user.findUnique({
            where:{
                id:userId
            }
          })
          if(!checkUser){
            console.log(`this is line 17 at verify user api`,checkUser)
            return Response.json({
                message:"No such user found to be verified!"
            },{status:404})
          }
          const response = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                isVerified:true
            }
          })
          if( !response){
            console.log(`this is line 32 at verify user api`,response)
            return Response.json({
                message:"Couldn't verify the account!"
            },{status:500})
          }

          return Response.json({
            message:"User Verified successfully!"
          })
       } catch (error) {
          
       }
}