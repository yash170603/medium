// "use client"
// import {useParams} from "next/navigation"
// import {useMutation, useQuery} from "@tanstack/react-query"
// import axios from "axios";
// import { updateBlogSchema } from "@/validation/updateBlogSchema";
// import { z } from "zod";



// export default function UpdateBlogPage(){

//     const params = useParams();
//     const blogId = params.blogId || " ";

//     const {data: blog,isPending,isError,error} = useQuery({
//         queryKey:["blogResponse",blogId],
//         queryFn:async ()=>{
//             const response = await axios.get(`/api/getBlogById/${blogId}`)
//              return response.data.blog 
//         }
//     })

//     const updateBlogMutation= useMutation({
//            mutationFn:async (data: z.infer<typeof updateBlogSchema>)=>{
//                  const updateBlogResponse = await axios.put('/api/updateBlog/',data)
//                  return updateBlogResponse.data
//            }
//     })

//     const onSubmit = async  (data: z.infer<typeof updateBlogSchema>) =>{
//                updateBlogMutation.mutate(data)
//     }

//     return <div className="min-h-screen h-full w-full bg-black text-white">
//               <div>
                     
//               </div>
//     </div>
// }

"use client"

import { useParams, useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { updateBlogSchema } from "@/validation/updateBlogSchema"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import React, { use } from "react"

export default function UpdateBlogPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const blogId = params.blogId as string


  const form = useForm<z.infer<typeof updateBlogSchema>>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      blogId: blogId,
      title: "",
      content: "",
    },
  })

  const { data: blogResponse, isPending, isError, error } = useQuery({
    queryKey: ["blogResponse", blogId],
    queryFn: async () => {
      const response = await axios.get(`/api/getBlogById/${blogId}`)
      return response.data.blogResponse
    },
  })

  // Populate form when blog data is fetched
  React.useEffect(() => {
    if (blogResponse) {
      form.reset({
        blogId: blogResponse.id,
        title: blogResponse.title,
        content: blogResponse.content,
      })
    }
  }, [blogResponse, form])

  const updateBlogMutation = useMutation({
    mutationFn: async (data: z.infer<typeof updateBlogSchema>) => {
      const updateBlogResponse = await axios.put('/api/updateBlog/', {
              postUpdateId:blogId,
              newTitle:data.title,
              newContent:data.content
      })
      return updateBlogResponse.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['thisBlog', blogId] })
      toast({
        title: "Success",
        description: "Blog was updated successfully",
      })
      router.push(`/blog/${blogId}`)
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to update blog. Please try again.",
        variant: "destructive",
        className: "text-white bg-blue-950 hover:bg-black",
      })
    }
  })

  const onSubmit = async (formData: z.infer<typeof updateBlogSchema>) => {
    updateBlogMutation.mutate(formData)
  }

  if (isPending) {
    return <div className="min-h-screen h-full w-full  bg-gray-900 text-white flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  }

  if (isError) {
    return <div className="min-h-screen h-full w-full bg-gray-900 text-white flex items-center justify-center">
      Error: {error.message}
    </div>
  }

  return (
    <div className="  h-full w-full bg-background fixed inset-0 text-foreground flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark bg-gray-900">
      <Card className="h-max w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">Update Blog Post</CardTitle>
          <CardDescription className="text-gray-400">Edit your thoughts and update your blog</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter the title of your blog post" 
                        {...field}
                        className="bg-gray-700 text-gray-100 border-gray-600 focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-200">Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your blog post content here" 
                        {...field}
                        className="bg-gray-700 text-gray-100 border-gray-600 focus:border-primary focus:ring-primary min-h-[200px]"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="bg-primary bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-colors duration-200" 
                disabled={updateBlogMutation.isPending}
              >
                {updateBlogMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Blog Post'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

