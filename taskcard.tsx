"use client"

import { useState } from "react"
import { Check, Clock, Edit, MoreVertical, Star, Trash } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"

import { Task } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface TaskCardProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onToggleComplete: () => void
}

export function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const deadlineDate = new Date(task.deadline)
  const timeRemaining = formatDistanceToNow(deadlineDate, { addSuffix: true })
  const isOverdue = deadlineDate < new Date() && !task.completed
  
  return (
    <div 
      className={cn(
        "rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg",
        task.color || "bg-white",
        task.completed ? "opacity-70" : "",
        isHovered ? "transform scale-[1.02]" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-4">
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onToggleComplete}>
                <Check className="mr-2 h-4 w-4" />
                {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mb-2">
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: task.importance }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h3 className={cn(
            "text-lg font-semibold line-clamp-2",
            task.completed ? "line-through text-gray-500" : ""
          )}>
            {task.title}
          </h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {task.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>{task.estimatedMinutes} min</span>
          </div>
          
          <div className={cn(
            "flex items-center",
            isOverdue ? "text-red-600 font-medium" : ""
          )}>
            {isOverdue && "⚠️ "}
            {timeRemaining}
          </div>
        </div>
        
        {task.completed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium transform -rotate-12">
              Completed
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
