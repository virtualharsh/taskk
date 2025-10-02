import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { toast } from "sonner"

const Notifications = () => {
    const API_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const { username } = useParams()
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchTasks()
    }, [username])

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks/user/${username}`)
            setTasks(response.data.tasks)
        } catch (error) {
            console.error("Failed to fetch tasks:", error)
            toast.error("Failed to fetch tasks")
        }
    }

    // Helper: check if date is today
    const isToday = (dateStr) => {
        if (!dateStr) return false
        const today = new Date()
        const deadline = new Date(dateStr)
        return (
            deadline.getFullYear() === today.getFullYear() &&
            deadline.getMonth() === today.getMonth() &&
            deadline.getDate() === today.getDate()
        )
    }

    // Helper: check if date is tomorrow
    const isTomorrow = (dateStr) => {
        if (!dateStr) return false
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)
        const deadline = new Date(dateStr)
        return (
            deadline.getFullYear() === tomorrow.getFullYear() &&
            deadline.getMonth() === tomorrow.getMonth() &&
            deadline.getDate() === tomorrow.getDate()
        )
    }

    const todayTasks = tasks.filter((task) => isToday(task.deadline))
    const tomorrowTasks = tasks.filter((task) => isTomorrow(task.deadline))

    return (
        <div className="flex flex-col items-center justify-start relative min-h-[calc(100vh-6rem)] px-4 py-6">
            <h1 className="text-2xl md:text-4xl absolute left-4 font-semibold mb-6">
                Alerts
            </h1>

            {/* Due Today */}
            <div className="w-full mt-20 max-w-3xl mb-6">
                <h2 className="text-lg font-semibold mb-4">📌 Due Today</h2>
                {todayTasks.length > 0 ? (
                    <div className="space-y-3">
                        {todayTasks.map((task) => (
                            <div
                                key={task._id}
                                onClick={() => navigate(`/user/${username}/${task._id}`)}
                                className="p-4 border rounded-lg cursor-pointer shadow-sm flex flex-col items-start"
                            >
                                <h3 className="text-base font-medium">{task.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Due today ({new Date(task.deadline).toLocaleDateString()})
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">No tasks due today 🎉</p>
                )}
            </div>

            {/* Due Tomorrow */}
            <div className="w-full max-w-3xl">
                <h2 className="text-lg font-semibold mb-4">⏳ Due Tomorrow</h2>
                {tomorrowTasks.length > 0 ? (
                    <div className="space-y-3">
                        {tomorrowTasks.map((task) => (
                            <div
                                key={task._id}
                                onClick={() => navigate(`/user/${username}/${task._id}`)}
                                className="p-4 border rounded-lg cursor-pointer shadow-sm flex flex-col items-start"
                            >
                                <h3 className="text-base font-medium">{task.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Due tomorrow ({new Date(task.deadline).toLocaleDateString()})
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        No tasks due tomorrow 🙌
                    </p>
                )}
            </div>
        </div>
    )
}

export default Notifications
