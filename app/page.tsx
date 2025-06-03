"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Calendar, Activity, TrendingUp, CheckCircle, Clock, Flame, Plus } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useHabitStore } from "@/lib/store"

export default function Home() {
  const [greeting, setGreeting] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())
  const { habits, activities } = useHabitStore()

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Buenos días")
    else if (hour < 18) setGreeting("Buenas tardes")
    else setGreeting("Buenas noches")

    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const todayHabits = habits.filter((h) => h.isActive)
  const completedToday = todayHabits.filter((h) => h.completedToday).length
  const totalHabits = todayHabits.length

  const stats = {
    todayHabits: { completed: completedToday, total: totalHabits },
    weeklyProgress: totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0,
    currentStreak: 12,
    productiveTime: 240,
  }

  const upcomingActivities = activities.slice(0, 3)

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
                <p className="text-sm text-muted-foreground">Progreso</p>
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
                <p className="text-sm text-muted-foreground">Racha</p>
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
                <p className="text-sm text-muted-foreground">Tiempo</p>
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
            <Progress value={stats.weeklyProgress} className="h-2" />
            <div className="space-y-2">
              {todayHabits.length === 0 ? (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No tienes hábitos configurados</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear primer hábito
                  </Button>
                </div>
              ) : (
                todayHabits.map((habit) => (
                  <div key={habit.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${habit.completedToday ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className={habit.completedToday ? "line-through text-muted-foreground" : ""}>
                        {habit.name}
                      </span>
                    </div>
                    <Badge variant={habit.completedToday ? "default" : "outline"}>{habit.category}</Badge>
                  </div>
                ))
              )}
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
            {upcomingActivities.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No hay actividades programadas</p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Programar actividad
                </Button>
              </div>
            ) : (
              upcomingActivities.map((activity) => (
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
              ))
            )}
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
