import {prisma} from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function GET(
  req: NextRequest,
) {
  try {
    // const session = await auth()
    // const clientId =  session?.currentUser.id
    // console.log(`this is the clientId ${clientId}`) , this is undefined
   const authorId = req.nextUrl.searchParams.get('authorId')
   console.log(`this is the authorId ${authorId}`)
    try {
      const response = await prisma.post.findMany({
        where: {
          authorId: authorId || undefined , // Handle null case by using undefined
        },
         orderBy:{
          updatedAt:'desc'
         }
      });

      if (response.length === 0) {
        console.log("No blogs found for this clientId.");
        console.log(`this is the line 27 at myBlogs api`, response)
        return NextResponse.json({
          message: "No Blogs were found",
          response:[]

        },{status:200});
      }

        console.log(`this is line 32 `,response)
      return NextResponse.json(
        {
          message: "Here are your blogs",
          response
        },
        { status: 200 }
      );
    } catch (error) {
      console.log('line 25')
      console.log(error)
    }

   // console.log("Blogs fetched successfully:", response);
   
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
