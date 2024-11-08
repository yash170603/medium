import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-400">BlogVerse</h1>
          <div className="space-x-4">
            <Button variant="ghost">
              <Link href={'/sign-in'} className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">Sign In</Link></Button>
            <Button variant="outline" className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white">Get Started</Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">Welcome to BlogVerse</h2>
          <p className="text-xl mb-8 text-gray-400">Discover stories, thinking, and expertise from writers on any topic.</p>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Start Reading</Button>
        </section>

        <section className="py-16">
          <h3 className="text-3xl font-bold mb-8 text-center text-white">Featured Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <Image src={`/placeholder.svg?height=200&width=400`} alt="Blog post thumbnail" width={400} height={200} className="rounded-t-lg" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl font-semibold mb-2 text-purple-400">Exploring the Future of AI</CardTitle>
                  <CardDescription className="text-gray-400">
                    A deep dive into the latest advancements in artificial intelligence and their potential impact on society.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-blue-400 hover:text-blue-300">Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

      </main>

      <footer className="bg-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 BlogVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}