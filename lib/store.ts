import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Habit {
  id: string
  name: string
  description?: string
  category: string
  color: string
  targetFrequency: number
  frequencyType: "daily" | "weekly" | "monthly"
  reminderTime?: string
  isActive: boolean
  completedToday: boolean
  currentStreak: number
  progress: number
  weeklyProgress: boolean[]
  createdAt: Date
}

export interface Activity {
  id: string
  name: string
  type: string
  time: string
  date: string
  duration: number
  isCompleted: boolean
  notes?: string
  color: string
}

interface HabitStore {
  habits: Habit[]
  activities: Activity[]
  addHabit: (habit: Omit<Habit, "id" | "createdAt">) => void
  toggleHabit: (id: string) => void
  deleteHabit: (id: string) => void
  addActivity: (activity: Omit<Activity, "id">) => void
  toggleActivity: (id: string) => void
  deleteActivity: (id: string) => void
  exportData: () => any
  importData: (data: any) => void
  clearAllData: () => void
}

export const useHabitStore = create<HabitStore>()(
  persist(
    (set, get) => ({
      habits: [
        {
          id: "1",
          name: "Ejercicio matutino",
          description: "30 minutos de ejercicio cada mañana",
          category: "exercise",
          color: "#4CAF50",
          targetFrequency: 1,
          frequencyType: "daily",
          reminderTime: "07:00",
          isActive: true,
          completedToday: false,
          currentStreak: 15,
          progress: 85,
          weeklyProgress: [true, true, true, true, true, false, true],
          createdAt: new Date(),
        },
        {
          id: "2",
          name: "Lectura diaria",
          description: "Leer al menos 20 páginas",
          category: "learning",
          color: "#3B82F6",
          targetFrequency: 1,
          frequencyType: "daily",
          reminderTime: "20:00",
          isActive: true,
          completedToday: true,
          currentStreak: 8,
          progress: 60,
          weeklyProgress: [true, true, false, true, true, true, false],
          createdAt: new Date(),
        },
        {
          id: "3",
          name: "Meditación",
          description: "10 minutos de mindfulness",
          category: "mindfulness",
          color: "#8B5CF6",
          targetFrequency: 1,
          frequencyType: "daily",
          reminderTime: "06:30",
          isActive: true,
          completedToday: true,
          currentStreak: 22,
          progress: 100,
          weeklyProgress: [true, true, true, true, true, true, true],
          createdAt: new Date(),
        },
      ],
      activities: [
        {
          id: "1",
          name: "Reunión de equipo",
          type: "meeting",
          time: "10:00",
          date: new Date().toISOString(),
          duration: 60,
          isCompleted: false,
          notes: "Revisión del sprint actual",
          color: "#3B82F6",
        },
        {
          id: "2",
          name: "Almuerzo",
          type: "meal",
          time: "13:00",
          date: new Date().toISOString(),
          duration: 60,
          isCompleted: false,
          color: "#F59E0B",
        },
        {
          id: "3",
          name: "Ejercicio",
          type: "exercise",
          time: "18:00",
          date: new Date().toISOString(),
          duration: 90,
          isCompleted: false,
          color: "#10B981",
        },
      ],
      addHabit: (habit) =>
        set((state) => ({
          habits: [
            ...state.habits,
            {
              ...habit,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),
      toggleHabit: (id) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === id
              ? {
                  ...habit,
                  completedToday: !habit.completedToday,
                  currentStreak: !habit.completedToday ? habit.currentStreak + 1 : habit.currentStreak,
                  progress: !habit.completedToday ? Math.min(100, habit.progress + 10) : habit.progress,
                }
              : habit,
          ),
        })),
      deleteHabit: (id) =>
        set((state) => ({
          habits: state.habits.filter((habit) => habit.id !== id),
        })),
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            ...state.activities,
            {
              ...activity,
              id: Date.now().toString(),
            },
          ],
        })),
      toggleActivity: (id) =>
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.id === id ? { ...activity, isCompleted: !activity.isCompleted } : activity,
          ),
        })),
      deleteActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        })),
      exportData: () => {
        const state = get()
        return {
          habits: state.habits,
          activities: state.activities,
          exportDate: new Date().toISOString(),
        }
      },
      importData: (data) => {
        if (data.habits) {
          set((state) => ({ ...state, habits: data.habits }))
        }
        if (data.activities) {
          set((state) => ({ ...state, activities: data.activities }))
        }
      },
      clearAllData: () =>
        set(() => ({
          habits: [],
          activities: [],
        })),
    }),
    {
      name: "habit-tracker-storage",
    },
  ),
)
