import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchBlogs(){
    try{
        const blogs = await prisma.posts.findMany({
            include:{
                author : true
            }
        })
        return blogs
    }catch(error){
        console.error("Error fetching user with posts: ", error);
    }

}
export default async function BlogLists(){
    const allblogs = await fetchBlogs()

    return(
        <div>
            {
                allblogs?.map((blog) => (
                    <div>
                        <p className="font-semibold text-xl">{blog.title}</p>
                        <p className="font-light text-md">{blog.content}</p>
                    </div>
                ))
            }
        </div>
    )
}