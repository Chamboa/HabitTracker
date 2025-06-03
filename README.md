# 🎯 Habit Tracker

Una aplicación web moderna para gestionar hábitos, actividades y tiempo de manera eficiente.

## ✨ Características

- 📱 **PWA** - Funciona como app móvil
- 🌙 **Tema claro/oscuro** - Personalizable
- 📊 **Dashboard intuitivo** - Resumen completo
- 🎯 **Gestión de hábitos** - Seguimiento de progreso
- 📅 **Calendario integrado** - Planificación de actividades
- 📈 **Estadísticas detalladas** - Análisis de progreso
- 🔔 **Notificaciones web** - Recordatorios inteligentes
- 💾 **Respaldo de datos** - Exportación e importación
- 💾 **Sin base de datos** - Todo se guarda en tu navegador

## 🚀 Inicio rápido

### Instalación

1. **Clona el repositorio**
\`\`\`bash
git clone https://github.com/tu-usuario/habit-tracker.git
cd habit-tracker
\`\`\`

2. **Instala dependencias**
\`\`\`bash
npm install
\`\`\`

3. **Inicia el servidor de desarrollo**
\`\`\`bash
npm run dev
\`\`\`

4. **Abre tu navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 🌐 Deploy en Vercel

1. **Conecta tu repositorio a Vercel**
2. **Deploy automático** ✨

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📱 Instalación como PWA

### En Android (Chrome):
1. Abre la app en Chrome
2. Toca los 3 puntos (⋮) 
3. Selecciona **"Agregar a pantalla de inicio"**
4. ¡Listo! Ya tienes la app instalada

### En iPhone (Safari):
1. Abre la app en Safari
2. Toca el botón de compartir (□↗)
3. Selecciona **"Agregar a pantalla de inicio"**
4. ¡Listo! Ya tienes la app instalada

## 💾 Persistencia de Datos

- **Sin base de datos externa** - Todo se guarda en localStorage
- **Datos permanentes** - No se borran al cerrar la app
- **Exportar/Importar** - Respalda tus datos fácilmente
- **Funciona offline** - No necesita internet

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Estado**: Zustand + localStorage
- **PWA**: next-pwa
- **Deploy**: Vercel

## 📂 Estructura del proyecto

\`\`\`
habit-tracker/
├── app/                    # App Router (Next.js 14)
├── components/            # Componentes reutilizables
├── lib/                   # Store y utilidades
├── hooks/                 # Custom hooks
├── public/               # Archivos estáticos y PWA
└── README.md
\`\`\`

## 🎯 Funcionalidades

### Dashboard
- Resumen diario de hábitos
- Estadísticas de progreso
- Próximas actividades
- Acciones rápidas

### Hábitos
- Crear y gestionar hábitos
- Seguimiento de rachas
- Progreso semanal
- Categorías personalizables

### Calendario
- Vista mensual
- Eventos y actividades
- Planificación diaria

### Actividades
- Gestión de tiempo
- Diferentes tipos de actividades
- Seguimiento de productividad

### Configuración
- Tema claro/oscuro
- Notificaciones
- Exportar/Importar datos
- Gestión de privacidad

## 📱 Uso como App Móvil

Una vez instalada como PWA:
- ✅ Icono en pantalla de inicio
- ✅ Funciona offline
- ✅ Notificaciones push
- ✅ Pantalla completa
- ✅ Experiencia nativa

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
