<template>
    <div class="min-h-screen bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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

            <!-- Dashboard Content -->
            <div v-else class="space-y-8">
                <!-- Header -->
                <div class="text-center space-y-4">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-900">
                        Tu Dashboard
                    </h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        Bienvenido, {{ userStore.userEmail }}
                    </p>
                </div>

                <!-- User Info Card -->
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="flex items-center justify-between">
                        <div class="space-y-2">
                            <h2 class="text-2xl font-bold text-gray-900">Información del Usuario</h2>
                            <p class="text-gray-600">Email: {{ userStore.userEmail }}</p>
                            <p class="text-gray-600">Miembro desde: {{ formatDate(userStore.user?.createdAt) }}</p>
                        </div>
                        <button 
                            @click="handleLogout"
                            class="btn-secondary inline-flex items-center gap-2"
                        >
                            <ArrowRightOnRectangleIcon class="w-5 h-5" />
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                <!-- Diagnosis Status -->
                <div class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="space-y-6">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <ClipboardDocumentCheckIcon class="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 class="text-2xl font-bold text-gray-900">Estado del Diagnóstico</h2>
                        </div>

                        <div v-if="userStore.hasDiagnosis" class="space-y-4">
                            <div class="bg-green-50 border border-green-200 rounded-lg p-6">
                                <div class="flex items-center gap-3">
                                    <CheckCircleIcon class="w-6 h-6 text-green-600" />
                                    <div>
                                        <h3 class="font-semibold text-green-800">Diagnóstico Completado</h3>
                                        <p class="text-green-700">Tu diagnóstico fue completado el {{ formatDate(userStore.diagnosis?.createdAt) }}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex flex-col sm:flex-row gap-4">
                                <NuxtLink 
                                    to="/resultados" 
                                    class="btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 inline-flex items-center gap-2"
                                >
                                    <EyeIcon class="w-5 h-5" />
                                    Ver Resultados
                                </NuxtLink>
                                
                                <NuxtLink 
                                    to="/diagnostico" 
                                    class="btn-secondary inline-flex items-center gap-2"
                                >
                                    <ArrowPathIcon class="w-5 h-5" />
                                    Realizar Nuevo Diagnóstico
                                </NuxtLink>
                            </div>
                        </div>

                        <div v-else class="space-y-4">
                            <div class="bg-amber-50 border border-amber-200 rounded-lg p-6">
                                <div class="flex items-center gap-3">
                                    <ExclamationTriangleIcon class="w-6 h-6 text-amber-600" />
                                    <div>
                                        <h3 class="font-semibold text-amber-800">Diagnóstico Pendiente</h3>
                                        <p class="text-amber-700">Aún no has completado tu diagnóstico personalizado</p>
                                    </div>
                                </div>
                            </div>
                            
                            <NuxtLink 
                                to="/diagnostico" 
                                class="btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 inline-flex items-center gap-2"
                            >
                                <ClipboardDocumentIcon class="w-5 h-5" />
                                Comenzar Diagnóstico
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Diagnosis Answers -->
                <div v-if="userStore.hasDiagnosis && userStore.diagnosis?.answers" class="bg-white rounded-xl p-8 shadow-sm border">
                    <div class="space-y-6">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <ClipboardDocumentIcon class="w-6 h-6 text-indigo-600" />
                            </div>
                            <h2 class="text-2xl font-bold text-gray-900">Tus Respuestas del Diagnóstico</h2>
                        </div>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div v-for="(value, key) in userStore.diagnosis.answers" :key="key" class="bg-gray-50 rounded-lg p-4 border">
                                <div class="text-xs text-gray-500 mb-1">{{ answerLabels[key] || key }}</div>
                                <div class="text-base text-gray-800 break-words">{{ value }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    CheckCircleIcon, 
    EyeIcon, 
    ArrowPathIcon, 
    ExclamationTriangleIcon,
    ClipboardDocumentCheckIcon,
    ClipboardDocumentIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

// Set page metadata
useHead({
    title: 'Dashboard - Sistema de Activación',
    meta: [
        { name: 'description', content: 'Tu dashboard personal' }
    ]
})

// @ts-expect-error Nuxt macro
definePageMeta({
    middleware: ['auth']
})

const userStore = useUserStore()

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const handleLogout = () => {
    userStore.logout()
    navigateTo('/login')
}

// Mapping of answer keys to Spanish labels
const answerLabels: Record<string, string> = {
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    phone: 'Teléfono celular',
    occupation: 'Ocupación',
    age: 'Edad',
    family: 'Familia / Dependientes',
    responsibility: 'Nivel de responsabilidad',
    mainStatement: 'Frase con la que más te identificas',
    mainEmotion: 'Emoción predominante',
    energy: 'Nivel de energía y enfoque',
    procrastination: 'Motivo principal de procrastinación',
    reaction: 'Reacción ante dificultades',
    misalignment: 'Área de mayor desalineación',
    rituals: 'Rituales o hábitos de enfoque',
    autopilot: 'Frecuencia de actuar en piloto automático',
    unlock: 'Lo que te gustaría desbloquear primero',
    result30: 'Resultado concreto deseado en 30 días',
    noChange6: 'Consecuencias si nada cambia en 6 meses',
}
</script>

<style scoped>
.btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-colors duration-200;
}

.btn-secondary {
    @apply inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200;
}
</style>