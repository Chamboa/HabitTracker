"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Calendar, Activity, TrendingUp, CheckCircle, Clock, Flame } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function DashboardPage() {
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Buenos días")
    else if (hour < 18) setGreeting("Buenas tardes")
    else setGreeting("Buenas noches")

    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mock data - replace with real data from your API
  const stats = {
    todayHabits: { completed: 3, total: 5 },
    weeklyProgress: 75,
    currentStreak: 12,
    productiveTime: 240, // minutes
  }

  const todayHabits = [
    { id: 1, name: "Ejercicio matutino", completed: true, category: "exercise" },
    { id: 2, name: "Lectura", completed: true, category: "learning" },
    { id: 3, name: "Meditación", completed: true, category: "mindfulness" },
    { id: 4, name: "Beber agua", completed: false, category: "health" },
    { id: 5, name: "Escribir diario", completed: false, category: "personal" },
  ]

  const upcomingActivities = [
    { id: 1, name: "Reunión de equipo", time: "10:00", type: "meeting" },
    { id: 2, name: "Almuerzo", time: "13:00", type: "meal" },
    { id: 3, name: "Ejercicio", time: "18:00", type: "exercise" },
  ]

  return (
    <div className="container mx-auto p-4 space-y-6 md:ml-64">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{greeting}</h1>
        <p className="text-muted-foreground">{format(currentTime, "EEEE, d 'de' MMMM", { locale: es })}</p>
        <p className="text-sm text-muted-foreground">{format(currentTime, "HH:mm:ss")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Hábitos hoy</p>
                <p className="text-2xl font-bold">
                  {stats.todayHabits.completed}/{stats.todayHabits.total}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Progreso semanal</p>
                <p className="text-2xl font-bold">{stats.weeklyProgress}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Racha actual</p>
                <p className="text-2xl font-bold">{stats.currentStreak}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Tiempo productivo</p>
                <p className="text-2xl font-bold">
                  {Math.floor(stats.productiveTime / 60)}h {stats.productiveTime % 60}m
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Habits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Hábitos de hoy</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={(stats.todayHabits.completed / stats.todayHabits.total) * 100} className="h-2" />
            <div className="space-y-2">
              {todayHabits.map((habit) => (
                <div key={habit.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${habit.completed ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className={habit.completed ? "line-through text-muted-foreground" : ""}>{habit.name}</span>
                  </div>
                  <Badge variant={habit.completed ? "default" : "outline"}>{habit.category}</Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Próximas actividades</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="outline">{activity.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Target className="h-6 w-6" />
              <span className="text-xs">Nuevo hábito</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-xs">Programar</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Activity className="h-6 w-6" />
              <span className="text-xs">Actividad</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-xs">Estadísticas</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
