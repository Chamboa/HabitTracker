import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours === 0) {
    return `${mins}m`
  }

  return `${hours}h ${mins > 0 ? `${mins}m` : ""}`
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Buenos días"
  if (hour < 18) return "Buenas tardes"
  return "Buenas noches"
}

export function calculateStreak(completions: Date[]): number {
  if (completions.length === 0) return 0

  const sortedDates = completions
    .map((date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()))
    .sort((a, b) => b.getTime() - a.getTime())

  let streak = 1
  let currentDate = sortedDates[0]

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(currentDate)
    prevDate.setDate(prevDate.getDate() - 1)

    if (sortedDates[i].getTime() === prevDate.getTime()) {
      streak++
      currentDate = sortedDates[i]
    } else {
      break
    }
  }

  return streak
}

export function getHabitCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    health: "#E91E63",
    productivity: "#3F51B5",
    learning: "#9C27B0",
    exercise: "#4CAF50",
    nutrition: "#FF9800",
    mindfulness: "#00BCD4",
    social: "#FF5722",
    personal: "#607D8B",
  }

  return colors[category] || "#6366F1"
}
