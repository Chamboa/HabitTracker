"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Plus, Clock, CheckCircle, MoreVertical, TrendingUp, Target } from "lucide-react"
import { useHabitStore } from "@/lib/store"

export default function ActivitiesPage() {
  const [selectedFilter, setSelectedFilter] = useState("all")
  const { activities, toggleActivity } = useHabitStore()

  const stats = {
    totalActivities: activities.length,
    completedActivities: activities.filter((a) => a.isCompleted).length,
    productiveTime: activities
      .filter((a) => a.isCompleted && ["work", "study"].includes(a.type))
      .reduce((total, a) => total + a.duration, 0),
    completionRate:
      activities.length > 0
        ? Math.round((activities.filter((a) => a.isCompleted).length / activities.length) * 100)
        : 0,
  }

  const filters = [
    { id: "all", name: "Todas", count: activities.length },
    { id: "pending", name: "Pendientes", count: activities.filter((a) => !a.isCompleted).length },
    { id: "completed", name: "Completadas", count: activities.filter((a) => a.isCompleted).length },
  ]

  const filteredActivities = activities.filter((activity) => {
    switch (selectedFilter) {
      case "pending":
        return !activity.isCompleted
      case "completed":
        return activity.isCompleted
      default:
        return true
    }
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meeting":
        return "👥"
      case "exercise":
        return "💪"
      case "study":
        return "📚"
      case "meal":
        return "🍽️"
      case "work":
        return "💼"
      default:
        return "📋"
    }
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      meeting: "Reunión",
      exercise: "Ejercicio",
      study: "Estudio",
      meal: "Comida",
      work: "Trabajo",
      personal: "Personal",
    }
    return labels[type] || type
  }

  return (
    <div className="container mx-auto p-4 space-y-6 md:ml-64">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Actividades</h1>
          <p className="text-muted-foreground">Gestiona tu tiempo y actividades diarias</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva actividad
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.totalActivities}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Completadas</p>
                <p className="text-2xl font-bold">{stats.completedActivities}</p>
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

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Tasa de éxito</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso del día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Actividades completadas</span>
              <span>
                {stats.completedActivities}/{stats.totalActivities}
              </span>
            </div>
            <Progress value={stats.completionRate} className="h-2" />
            <p className="text-sm text-muted-foreground">{stats.completionRate}% de tus actividades completadas</p>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={selectedFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter.id)}
            className="whitespace-nowrap"
          >
            {filter.name}
            <Badge variant="secondary" className="ml-2">
              {filter.count}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="text-2xl">{getTypeIcon(activity.type)}</div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-lg">{activity.name}</h3>
                      <Badge variant="outline">{getTypeLabel(activity.type)}</Badge>
                      {activity.isCompleted && (
                        <Badge className="bg-green-500">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completada
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{activity.time}</span>
                      </div>
                      <span>•</span>
                      <span>{activity.duration} min</span>
                    </div>

                    {activity.notes && (
                      <p className="text-sm text-muted-foreground bg-muted p-2 rounded">{activity.notes}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!activity.isCompleted && (
                    <Button size="sm" onClick={() => toggleActivity(activity.id)}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completar
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredActivities.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Activity className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No hay actividades</h3>
            <p className="text-muted-foreground text-center mb-4">Comienza agregando tu primera actividad del día</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Crear actividad
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
