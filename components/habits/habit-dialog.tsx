"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Target } from "lucide-react"
import { useHabitStore } from "@/lib/store"

interface HabitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HabitDialog({ open, onOpenChange }: HabitDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("health")
  const [color, setColor] = useState("#6366F1")
  const { addHabit } = useHabitStore()

  const categories = [
    { id: "health", name: "Salud", color: "#E91E63" },
    { id: "exercise", name: "Ejercicio", color: "#4CAF50" },
    { id: "learning", name: "Aprendizaje", color: "#9C27B0" },
    { id: "productivity", name: "Productividad", color: "#3F51B5" },
    { id: "mindfulness", name: "Mindfulness", color: "#00BCD4" },
    { id: "personal", name: "Personal", color: "#607D8B" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    addHabit({
      name: name.trim(),
      description: description.trim() || undefined,
      category,
      color,
      targetFrequency: 1,
      frequencyType: "daily",
      isActive: true,
      completedToday: false,
      currentStreak: 0,
      progress: 0,
      weeklyProgress: [false, false, false, false, false, false, false],
    })

    // Reset form
    setName("")
    setDescription("")
    setCategory("health")
    setColor("#6366F1")
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Nuevo Hábito</span>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre del hábito</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Ejercicio matutino"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium">Descripción (opcional)</label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: 30 minutos de ejercicio cada mañana"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Categoría</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id)
                      setColor(cat.color)
                    }}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      category === cat.id ? "border-primary bg-primary/10" : "border-border hover:bg-accent"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Crear Hábito
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
