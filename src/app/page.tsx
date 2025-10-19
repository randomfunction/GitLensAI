'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Scene from '@/components/Scene'
import { Button } from '@/components/ui/button'

export default function NewHomePage() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Scene/>
      </div>
      <main className="relative z-10 flex flex-col items-center justify-center h-full text-white bg-black/20">
        <motion.h1
          initial={{opacity:0,y:-50}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.8,ease:'easeOut'}}
          className="text-5xl md:text-7xl font-bold text-center mb-4"
        >
          Welcome to GitLens.AI
        </motion.h1>
        <motion.p
          initial={{opacity:0,y:50}}
          animate={{opacity:1,y:0}}
          transition={{duration:0.8,delay:0.3,ease:'easeOut'}}
          className="text-lg md:text-xl text-center max-w-2xl mb-8"
        >
          Your AI-powered assistant for GitHub profile analysis and comparison.
        </motion.p>
        <motion.div
          initial={{opacity:0,scale:0.8}}
          animate={{opacity:1,scale:1}}
          transition={{duration:0.5,delay:0.6,ease:'easeOut'}}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/analyze" passHref>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_#38BDF8] hover:shadow-[0_0_25px_#38BDF8] px-8 py-6 text-lg"
            >
              Analyze Profile
            </Button>
          </Link>
          <Link href="/compare" passHref>
            <Button
              variant="outline"
              className="bg-transparent border-2 border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-black transition-all duration-300 shadow-[0_0_15px_#38BDF8] hover:shadow-[0_0_25px_#38BDF8] px-8 py-6 text-lg"
            >
              Compare Profiles
            </Button>
          </Link>
        </motion.div>
      </main>
      <footer className="absolute bottom-0 left-0 w-full z-10 p-4 text-center text-white/50">
        <div className="container mx-auto border-t border-white/10 pt-4">
          © {new Date().getFullYear()} GitLens.AI
        </div>
      </footer>
    </div>
  )
}
