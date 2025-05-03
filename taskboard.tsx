"use client"

import { useEffect, useState } from "react"
import { TaskCard } from "@/components/task-card"
import { TaskFormDialog } from "@/components/task-form-dialog"
import { Task } from "@/lib/types"
import { prioritizeTasks } from "@/lib/greedy-algorithm"

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  
  useEffect(() => {
    // Load tasks from localStorage on component mount
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)
        setTasks(prioritizeTasks(parsedTasks))
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e)
      }
    } else {
      // Set some example tasks if none exist
      const exampleTasks: Task[] = [
        {
          id: "1",
          title: "Complete project proposal",
          description: "Finish the quarterly project proposal with budget estimates",
          deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
          importance: 5,
          estimatedMinutes: 120,
          completed: false,
          color: "bg-yellow-100",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Schedule team meeting",
          description: "Set up a meeting with the development team to discuss new features",
          deadline: new Date(Date.now() + 86400000 * 1).toISOString(), // 1 day from now
          importance: 4,
          estimatedMinutes: 30,
          completed: false,
          color: "bg-blue-100",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Review pull requests",
          description: "Review and merge pending pull requests from the team",
          deadline: new Date(Date.now() + 86400000 * 0.5).toISOString(), // 12 hours from now
          importance: 3,
          estimatedMinutes: 60,
          completed: false,
          color: "bg-green-100",
          createdAt: new Date().toISOString(),
        },
        {
          id: "4",
          title: "Update documentation",
          description: "Update the API documentation with the latest changes",
          deadline: new Date(Date.now() + 86400000 * 5).toISOString(), // 5 days from now
          importance: 2,
          estimatedMinutes: 90,
          completed: false,
          color: "bg-purple-100",
          createdAt: new Date().toISOString(),
        },
        {
          id: "5",
          title: "Prepare for presentation",
          description: "Create slides for the upcoming client presentation",
          deadline: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
          importance: 5,
          estimatedMinutes: 180,
          completed: false,
          color: "bg-red-100",
          createdAt: new Date().toISOString(),
        },
      ]
      setTasks(prioritizeTasks(exampleTasks))
      localStorage.setItem("tasks", JSON.stringify(exampleTasks))
    }
  }, [])

  const handleAddTask = (task: Task) => {
    const newTasks = [...tasks, task]
    const prioritized = prioritizeTasks(newTasks)
    setTasks(prioritized)
    localStorage.setItem("tasks", JSON.stringify(prioritized))
    setIsFormOpen(false)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(t => 
      t.id === updatedTask.id ? updatedTask : t
    )
    const prioritized = prioritizeTasks(updatedTasks)
    setTasks(prioritized)
    localStorage.setItem("tasks", JSON.stringify(prioritized))
    setIsFormOpen(false)
    setEditingTask(null)
  }

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId)
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const handleToggleComplete = (taskId: string) => {
    const updatedTasks = tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    )
    const prioritized = prioritizeTasks(updatedTasks)
    setTasks(prioritized)
    localStorage.setItem("tasks", JSON.stringify(prioritized))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <button 
          onClick={() => {
            setEditingTask(null)
            setIsFormOpen(true)
          }}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700"
        >
          Add New Task
        </button>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-max">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => handleEditTask(task)}
            onDelete={() => handleDeleteTask(task.id)}
            onToggleComplete={() => handleToggleComplete(task.id)}
          />
        ))}
      </div>
      
      <TaskFormDialog
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingTask(null)
        }}
        onSave={editingTask ? handleUpdateTask : handleAddTask}
        task={editingTask}
      />
    </div>
  )
}
