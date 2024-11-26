"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen fixed inset-0 overflow-auto h-full w-full bg-gray-900 text-gray-100">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-400">BlogVerse</h1>
          <div className="space-x-4">
            <Button variant="ghost">
              <Link
                href={"/sign-in"}
                className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
              >
                Sign In
              </Link>
            </Button>
            <Button
              variant="outline"
              className="text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-white"
            >
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        {/* <section className="py-20 text-center">
          <h2 className="text-5xl font-bold mb-6 text-white">Welcome to BlogVerse</h2>
          <p className="text-xl mb-8 text-gray-400">Discover stories, thinking, and expertise from writers on any topic.</p>
          <Button className="bg-green-500 hover:bg-green-600 text-white">Start Reading</Button>
        </section> */}

        {/* <section className="py-16">
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
        </section> */}

        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
              Welcome to BlogVerse!
            </div>
            <div className="font-extralight text-base text-black md:text-4xl dark:text-neutral-200 py-4">
              Explore the world of blogs and share your own stories.
            </div>
            <Link href={"/sign-in"}>
            <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Explore! 
            </button>
            </Link>
          
          </motion.div>
        </AuroraBackground>
      </main>

      <footer className="bg-gray-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 BlogVerse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
