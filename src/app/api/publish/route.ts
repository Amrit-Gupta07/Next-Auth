import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/options";


const prisma = new PrismaClient()

interface postschema {
    title : string,
    content : string,
}

export async function POST(req:NextRequest){
    const session = await getServerSession(authOptions);
  // Check if the user is authenticated
    if (!session || !session.user) {
        return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
        );
    }
    console.log(session);
    const body = await req.json()

    const {title, content} = body as postschema;
  // Validate input
    if (!title || !content) {
        return NextResponse.json(
        { success: false, message: "Title and description are required" },
        { status: 400 }
        );
    }
    try{

        const post = await prisma.posts.create({
            data:{
                title :title,
                content:content,
                published:true,
                author:{
                    connect:{id: session?.user?.id},
                }
            }
        })
        
        return NextResponse.json({
            success : true,
            message : "Post Published Successfully",
            data : post,
        },{status: 201})
    }
    catch(error){
        console.error("Error creating post:", error);
        return NextResponse.json(
          { success: false, message: "Failed to create post" },
          { status: 500 }
        );
    }
}