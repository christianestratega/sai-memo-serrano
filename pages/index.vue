<template>
    <div class="space-y-12">
        <!-- Loading State -->
        <div v-if="userStore.isLoading" class="text-center py-12">
            <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 hover:bg-blue-400 transition ease-in-out duration-150 cursor-not-allowed">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando...
            </div>
        </div>

        <!-- Login Form (when not authenticated) -->
        <div v-else-if="!userStore.isAuthenticated" class="text-center space-y-8">
            <div class="space-y-4">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
                    Bienvenido al <span class="text-primary-600">Sistema</span>
                    <span class="block md:hidden text-primary-600">
                        de Activación Interna™
                    </span>
                    <span class="hidden md:inline">
                        <br>
                        <span class="text-primary-600">de Activación Interna™</span>
                    </span>
                </h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Descubre tu potencial máximo y transforma tu vida con nuestro sistema de diagnóstico personalizado y plan de acción adaptado a tus necesidades específicas.
                </p>
            </div>
            
            <!-- Login Form -->
            <div class="max-w-md mx-auto">
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            v-model="loginForm.email"
                            type="email"
                            required
                            class="w-full py-4 px-5 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 placeholder-gray-400 text-base bg-white hover:border-gray-400"
                            placeholder="tu@email.com"
                        />
                    </div>

                    <button
                        type="submit"
                        :disabled="isLoggingIn"
                        class="w-full btn-primary text-lg px-8 py-4 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span v-if="isLoggingIn">Accediendo...</span>
                        <span v-else>Continuar</span>
                    </button>
                </form>

                <div v-if="loginError" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p class="text-sm text-red-600">{{ loginError }}</p>
                </div>
            </div>
        </div>

        <!-- Authenticated User Content -->
        <div v-else class="space-y-8">
            <!-- Welcome Message -->
            <div class="text-center space-y-4">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl mx-auto">
                    ¡Bienvenido, <span class="text-primary-600">{{ userStore.userDisplayName }}</span>!
                </h1>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Bienvenido de vuelta al Sistema de Activación Interna™
                </p>
            </div>

            <!-- User has Diagnosis - Show Menu -->
            <div v-if="userStore.hasDiagnosis" class="max-w-4xl mx-auto">
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="text-center space-y-6">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-gray-900">Tu diagnóstico está listo</h2>
                        <p class="text-gray-600">Accede a tu plan personalizado y recursos exclusivos</p>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-6 mt-8">
                        <NuxtLink 
                            to="/dashboard" 
                            class="card text-center space-y-4 hover:shadow-lg transition-shadow duration-200"
                        >
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900">Ver mi Dashboard</h3>
                            <p class="text-gray-600">Revisa tu progreso y estadísticas</p>
                        </NuxtLink>

                        <NuxtLink 
                            to="/resultados" 
                            class="card text-center space-y-4 hover:shadow-lg transition-shadow duration-200"
                        >
                            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900">Ver mis Resultados</h3>
                            <p class="text-gray-600">Tu diagnóstico personalizado</p>
                        </NuxtLink>

                        <NuxtLink 
                            to="/bonos" 
                            class="card text-center space-y-4 hover:shadow-lg transition-shadow duration-200"
                        >
                            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900">Ver mis Bonos</h3>
                            <p class="text-gray-600">Recursos exclusivos para ti</p>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- User has NO Diagnosis - Show CTA -->
            <div v-else class="max-w-4xl mx-auto">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8 shadow-lg">
                    <div class="text-center space-y-6">
                        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="space-y-3">
                            <h2 class="text-2xl font-bold text-gray-900">Completa tu diagnóstico para recibir tu plan personalizado</h2>
                            <p class="text-gray-600 max-w-2xl mx-auto text-lg">
                                Descubre tu patrón dominante y recibe estrategias específicas para maximizar tu potencial y transformar tu vida.
                            </p>
                        </div>
                        <NuxtLink 
                            to="/diagnostico" 
                            class="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                        >
                            Empezar Diagnóstico
                            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Logout Button -->
            <div class="text-center">
                <button 
                    @click="handleLogout"
                    class="btn-secondary inline-flex items-center gap-2"
                >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Set page metadata
useHead({
    title: 'Sistema de Activación Interna™',
    meta: [
        { name: 'description', content: 'Descubre tu potencial máximo y transforma tu vida con nuestro sistema de diagnóstico personalizado' }
    ]
})

const userStore = useUserStore()
const isLoggingIn = ref(false)
const loginError = ref('')
const loginForm = ref({
    email: ''
})



// Check authentication on mount
onMounted(async () => {
    await userStore.checkAuth()
})

const handleLogin = async () => {
    if (!loginForm.value.email) {
        loginError.value = 'Por favor ingresa tu correo electrónico'
        return
    }

    isLoggingIn.value = true
    loginError.value = ''

    try {
        const result = await userStore.login(loginForm.value.email)
        
        if (result.success) {
            // Page will automatically re-render with authenticated content
            loginForm.value = { email: '' }
        } else {
            loginError.value = 'Error al acceder. Intenta de nuevo.'
        }
    } catch (err) {
        loginError.value = 'Error al acceder. Intenta de nuevo.'
        console.error('Login error:', err)
    } finally {
        isLoggingIn.value = false
    }
}

const handleLogout = () => {
    userStore.logout()
    // Page will automatically re-render with login form
}
</script>

<style scoped>
.btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-colors duration-200;
}

.btn-secondary {
    @apply inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200;
}

.card {
    @apply bg-white rounded-xl p-6 shadow-sm border border-gray-200;
}
</style>