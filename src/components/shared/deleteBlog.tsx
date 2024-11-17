"use client"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { Trash2, Loader2} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast, useToast } from "@/hooks/use-toast";

export default function DeleteBlog({params}:{params:{id:string}}){
      const router = useRouter();
      const blogId=  params.id || '';
      const[isDeleting,setIsDeleting]=useState(false)
      const [pageError,setPageError] = useState<string | null>(null)
      console.log(`this is the blog id`,blogId);
       const deleteBlog= async ()=>{
           try {
            setIsDeleting(true)
               const deleteResponse = await axios.delete(`/api/deleteBlog/${blogId}`)
               console.log(`this is the delete response line 32`,deleteResponse);
               if( deleteResponse.status==200){
                router.push("/userBlogs")
                router.refresh()
               }
               console.log(`this is the delete response`,deleteResponse);
            
           } catch (error:any) {
             console.log(`this is the error line 27`,error)
               if( error.response.status==404){
                    toast({
                        title:"Error",
                        description:"Blog not found",
                        variant:"destructive"
                    })
               }
               else if( error.response.status>=500){
                toast({
                    title:"Error",
                    description:"Internal server error",
                    variant:"destructive"
                })
               }
           }
           finally{
            setIsDeleting(false)
           }
       }
    return (
        <div className="">
               <Button onClick={deleteBlog} className="bg-blue-950 hover:bg-black" disabled={isDeleting}>
                  {isDeleting ? <Loader2 className="animate-spin scroll-smooth"/> : <Trash2/>}
               </Button>
        </div>
    )
}