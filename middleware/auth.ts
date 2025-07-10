export default defineNuxtRouteMiddleware((to) => {
  // Permitir siempre el acceso a la página de inicio
  if (to.path === '/') return

  // Acceso a Pinia store (en el lado del cliente)
  const userStore = useUserStore()
  const isClient = typeof window !== 'undefined'

  // Verificar sesión activa: en Pinia o en localStorage
  let isAuthenticated = false
  if (userStore.isAuthenticated) {
    isAuthenticated = true
  } else if (isClient) {
    const email = localStorage.getItem('userEmail')
    if (email) {
      isAuthenticated = true
    }
  }

  // Si no hay sesión activa, redirigir a la página de inicio
  if (!isAuthenticated) {
    return navigateTo('/')
  }
}) 