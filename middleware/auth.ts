export default defineNuxtRouteMiddleware(async (to) => {
    // Skip auth check for login page
    if (to.path === '/login') {
        return
    }

    // Check if we're on client side
    if (process.client) {
        const userStore = useUserStore()
        
        // Try to check auth if not already authenticated
        if (!userStore.isAuthenticated) {
            const isAuth = await userStore.checkAuth()
            if (!isAuth) {
                return navigateTo('/login')
            }
        }
    }
}) 