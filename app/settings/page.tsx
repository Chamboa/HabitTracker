"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun, Bell, Download, Upload, Trash2, User, Shield, HelpCircle, Star } from "lucide-react"
import { useTheme } from "next-themes"
import { useHabitStore } from "@/lib/store"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { exportData, importData, clearAllData } = useHabitStore()
  const [settings, setSettings] = useState({
    habitReminders: true,
    activityReminders: true,
    achievementNotifications: true,
    analytics: true,
    autoBackup: false,
  })

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `habit-tracker-backup-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          importData(data)
          alert("Datos importados exitosamente")
        } catch (error) {
          alert("Error al importar los datos")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6 md:ml-64">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">Personaliza tu experiencia con Habit Tracker</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <span>Apariencia</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Tema</h4>
              <p className="text-sm text-muted-foreground">Elige entre tema claro u oscuro</p>
            </div>
            <div className="flex space-x-2">
              <Button variant={theme === "light" ? "default" : "outline"} size="sm" onClick={() => setTheme("light")}>
                <Sun className="h-4 w-4 mr-2" />
                Claro
              </Button>
              <Button variant={theme === "dark" ? "default" : "outline"} size="sm" onClick={() => setTheme("dark")}>
                <Moon className="h-4 w-4 mr-2" />
                Oscuro
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notificaciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Recordatorios de hábitos</h4>
              <p className="text-sm text-muted-foreground">Recibe notificaciones para completar tus hábitos</p>
            </div>
            <Switch
              checked={settings.habitReminders}
              onCheckedChange={(checked) => updateSetting("habitReminders", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Recordatorios de actividades</h4>
              <p className="text-sm text-muted-foreground">Notificaciones para actividades programadas</p>
            </div>
            <Switch
              checked={settings.activityReminders}
              onCheckedChange={(checked) => updateSetting("activityReminders", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Logros y rachas</h4>
              <p className="text-sm text-muted-foreground">Celebra cuando completes rachas importantes</p>
            </div>
            <Switch
              checked={settings.achievementNotifications}
              onCheckedChange={(checked) => updateSetting("achievementNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Gestión de datos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Respaldo automático</h4>
              <p className="text-sm text-muted-foreground">Respalda tus datos automáticamente</p>
            </div>
            <Switch checked={settings.autoBackup} onCheckedChange={(checked) => updateSetting("autoBackup", checked)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar datos
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <label htmlFor="import-file">
                <Upload className="h-4 w-4 mr-2" />
                Importar datos
                <input id="import-file" type="file" accept=".json" className="hidden" onChange={handleImport} />
              </label>
            </Button>
            <Button variant="outline" className="justify-start" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Crear respaldo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Privacidad</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Análisis de uso</h4>
              <p className="text-sm text-muted-foreground">Ayúdanos a mejorar la aplicación</p>
            </div>
            <Switch checked={settings.analytics} onCheckedChange={(checked) => updateSetting("analytics", checked)} />
          </div>

          <div className="pt-4 border-t">
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => {
                if (confirm("¿Estás seguro? Esta acción no se puede deshacer.")) {
                  clearAllData()
                  alert("Todos los datos han sido eliminados")
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar todos los datos
            </Button>
            <p className="text-xs text-muted-foreground mt-2 text-center">Esta acción no se puede deshacer</p>
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Cuenta</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <User className="h-4 w-4 mr-2" />
            Editar perfil
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Cambiar contraseña
          </Button>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5" />
            <span>Soporte</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <HelpCircle className="h-4 w-4 mr-2" />
            Centro de ayuda
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Star className="h-4 w-4 mr-2" />
            Calificar la app
          </Button>
          <div className="pt-4 border-t text-center text-sm text-muted-foreground">
            <p>Habit Tracker v1.0.0</p>
            <p>Hecho con ❤️ para mejorar tus hábitos</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
