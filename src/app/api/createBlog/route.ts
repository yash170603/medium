import { prisma } from "@/app/lib/prisma";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
  try {
    const currentSession = await auth();
    console.log(`this is session ${currentSession}`)
    if (!currentSession) {
      return Response.json(
        {
          message: "Session is missing",
        },
        { status: 400 }
      );
    }
    const { title, content } = await request.json();
    const authorId = currentSession?.user?.id || "";
    const response = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published: true,
      },
    });
    console.log(response);
    if (!response) {
      console.log(
        `there was something wrong at line 26, createblogapi,`,
        response
      );
      return Response.json(
        {
          message: "Something went wrong, line 25 at createBlog api",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        message: "Blog created successfully!!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "There was an error while creating the blog, in catch block",
      },
      { status: 500 }
    );
  }
}
