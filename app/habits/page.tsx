"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Target, Plus, Search, CheckCircle, Circle, MoreVertical, Flame, BarChart3 } from "lucide-react"
import { useHabitStore } from "@/lib/store"
import { HabitDialog } from "@/components/habits/habit-dialog"

export default function HabitsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [showDialog, setShowDialog] = useState(false)
  const { habits, toggleHabit } = useHabitStore()

  const filters = [
    { id: "all", name: "Todos", count: habits.length },
    { id: "active", name: "Activos", count: habits.filter((h) => !h.completedToday).length },
    { id: "completed", name: "Completados", count: habits.filter((h) => h.completedToday).length },
  ]

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch = habit.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "active" && !habit.completedToday) ||
      (selectedFilter === "completed" && habit.completedToday)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="container mx-auto p-4 space-y-6 md:ml-64">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mis Hábitos</h1>
          <p className="text-muted-foreground">
            {habits.filter((h) => h.completedToday).length} de {habits.length} completados hoy
          </p>
        </div>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo hábito
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar hábitos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

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
      </div>

      {/* Habits Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredHabits.map((habit) => (
          <Card key={habit.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: habit.color }} />
                  <div>
                    <CardTitle className="text-lg">{habit.name}</CardTitle>
                    {habit.description && <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso: {Math.round(habit.progress)}%</span>
                  <span className="flex items-center space-x-1">
                    <Flame className="h-4 w-4 text-orange-500" />
                    <span>{habit.currentStreak} días</span>
                  </span>
                </div>
                <Progress value={habit.progress} className="h-2" />
              </div>

              {/* Weekly Progress */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Esta semana</p>
                <div className="flex space-x-1">
                  {habit.weeklyProgress.map((completed, index) => (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        completed ? "bg-green-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      {completed ? <CheckCircle className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {!habit.completedToday ? (
                  <Button
                    className="flex-1"
                    style={{ backgroundColor: habit.color }}
                    onClick={() => toggleHabit(habit.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completar
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Completado
                  </Button>
                )}
                <Button variant="outline" size="icon">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredHabits.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron hábitos</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm ? "Intenta con otros términos de búsqueda" : "Comienza creando tu primer hábito"}
            </p>
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear hábito
            </Button>
          </CardContent>
        </Card>
      )}

      <HabitDialog open={showDialog} onOpenChange={setShowDialog} />
    </div>
  )
}
