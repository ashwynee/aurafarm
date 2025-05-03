import { PlusCircle } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { TaskBoard } from "@/components/task-board"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="font-bold text-white">P</span>
            </div>
            <h1 className="text-xl font-bold">TaskPin</h1>
          </div>
          
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search tasks..."
                className="w-full h-10 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/add-task">
              <Button className="bg-red-600 hover:bg-red-700">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container px-4 py-8 mx-auto">
        <TaskBoard />
      </main>
    </div>
  )
}
