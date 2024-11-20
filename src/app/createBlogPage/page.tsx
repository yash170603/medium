'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { blogSchema } from "@/validation/blogSchema"
import { z } from "zod"
import axios from "axios"
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"


import { useMutation, useQueryClient } from "@tanstack/react-query"

export default function CreateBlogPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const queryClient= useQueryClient();

  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  })

  // const onSubmit = async (data: z.infer<typeof blogSchema>) => {
  //   try {
  //     setIsSubmitting(true)
  //     const response = await axios.post("/api/createBlog", data)
  //     console.log(`Blog creation response:`, response)
  //     toast({
  //       title: "Success",
  //       description: "Blog was created successfully",
  //     })
  //     form.reset()
  //     router.replace('/home')
  //   } catch (error) {
  //     console.error(error)
  //     toast({
  //       title: "Error",
  //       description: "Failed to create blog. Please try again.",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }


     const createMutation = useMutation({
         mutationFn: async (data: z.infer<typeof blogSchema>)=>{
            const response = await axios.post("/api/createBlog", data);
            return response.data.response;
         },onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['myBlogs']})
            toast({
              title: "Success",
              description: "Blog was created successfully",
            })
         },onError:(error:any)=>{
            toast({
              title: "Error",
              description: "Failed to create blog. Please try again.",
              variant: "destructive",
              className: "text-white bg-blue-950 hover:bg-black",
            })
         }
     })
     const onSubmit = (data:z.infer<typeof blogSchema>)=>{
             createMutation.mutate(data)
     }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark bg-gray-900">
      <Card className=" h-max w-full max-w-2xl bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-100">Create a New Blog Post</CardTitle>
          <CardDescription className="text-gray-400">Share your thoughts with the world</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit( onSubmit)} className="space-y-6">
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
                className=" bg-primary bg-blue-600 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-colors duration-200" 
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Blog Post'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}