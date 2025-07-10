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
                    <div class="flex items-center justify-between mb-6">
                        <div class="space-y-2">
                            <h2 class="text-2xl font-bold text-gray-900">Información del Usuario</h2>
                            <p class="text-gray-600">Miembro desde: {{ formatDate(userStore.user?.createdAt) }}</p>
                        </div>
                        <div class="flex gap-3">
                            <button 
                                @click="showEditForm = !showEditForm"
                                class="btn-primary inline-flex items-center gap-2"
                            >
                                <PencilIcon class="w-5 h-5" />
                                {{ showEditForm ? 'Cancelar' : 'Editar Perfil' }}
                            </button>
                            <button 
                                @click="handleLogout"
                                class="btn-secondary inline-flex items-center gap-2"
                            >
                                <ArrowRightOnRectangleIcon class="w-5 h-5" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>

                    <!-- Current Info Display -->
                    <div v-if="!showEditForm" class="grid md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <p class="text-gray-900">{{ userStore.user?.name || 'No especificado' }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <p class="text-gray-900">{{ userStore.userEmail }}</p>
                            </div>
                        </div>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <p class="text-gray-900">{{ userStore.user?.phone || 'No especificado' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Edit Form -->
                    <div v-else class="space-y-6">
                        <form @submit.prevent="handleUpdateProfile" class="space-y-6">
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre completo
                                    </label>
                                    <input
                                        id="name"
                                        v-model="editForm.name"
                                        type="text"
                                        placeholder="Tu nombre completo"
                                        class="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                                    />
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                                        Email <span class="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        v-model="editForm.email"
                                        type="email"
                                        required
                                        placeholder="tu@email.com"
                                        class="w-full py-3 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                                    />
                                </div>
                            </div>
                            <div>
                                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                                    Teléfono
                                </label>
                                <vue-tel-input
                                    v-model="editForm.phone"
                                    :preferred-countries="['mx', 'us', 'es', 'ar', 'co', 'pe', 'cl', 'br']"
                                    :style-object="{
                                        borderRadius: '0.5rem',
                                        padding: '0.75rem',
                                        fontSize: '1rem',
                                        width: '100%',
                                    }"
                                    input-classes="w-full rounded-lg p-3 text-base border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                                />
                            </div>
                            
                            <div class="flex gap-3">
                                <button
                                    type="submit"
                                    :disabled="isUpdating"
                                    class="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
                                >
                                    <CheckIcon v-if="!isUpdating" class="w-5 h-5" />
                                    <svg v-else class="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {{ isUpdating ? 'Guardando...' : 'Guardar Cambios' }}
                                </button>
                                <button
                                    type="button"
                                    @click="cancelEdit"
                                    class="btn-secondary"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>

                        <div v-if="updateError" class="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p class="text-red-700 text-sm">{{ updateError }}</p>
                        </div>
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
import { onMounted, ref } from 'vue'
import { 
    CheckCircleIcon, 
    EyeIcon, 
    ArrowPathIcon, 
    ExclamationTriangleIcon,
    ClipboardDocumentCheckIcon,
    ClipboardDocumentIcon,
    ArrowRightOnRectangleIcon,
    PencilIcon,
    CheckIcon
} from '@heroicons/vue/24/outline'

// Set page metadata
useHead({
    title: 'Dashboard - Sistema de Activación',
    meta: [
        { name: 'description', content: 'Tu dashboard personal' }
    ]
})

definePageMeta({
    middleware: ['auth']
})

const userStore = useUserStore()

// Reactive variables for profile editing
const showEditForm = ref(false)
const isUpdating = ref(false)
const updateError = ref('')
const editForm = ref({
    name: '',
    email: '',
    phone: ''
})

// Always fetch latest diagnosis on mount
onMounted(async () => {
    await userStore.checkAuth()
    // Initialize edit form with current user data
    if (userStore.user) {
        editForm.value = {
            name: userStore.user.name || '',
            email: userStore.user.email || '',
            phone: userStore.user.phone || ''
        }
    }
})

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
    navigateTo('/')
}

const handleUpdateProfile = async () => {
    isUpdating.value = true
    updateError.value = ''
    
    try {
        await userStore.updateUser({
            name: editForm.value.name || undefined,
            email: editForm.value.email,
            phone: editForm.value.phone || undefined
        })
        
        showEditForm.value = false
        // Show success message or toast here if needed
    } catch (error: any) {
        updateError.value = error.data?.statusMessage || 'Error al actualizar el perfil. Intenta de nuevo.'
    } finally {
        isUpdating.value = false
    }
}

const cancelEdit = () => {
    showEditForm.value = false
    updateError.value = ''
    // Reset form to current user data
    if (userStore.user) {
        editForm.value = {
            name: userStore.user.name || '',
            email: userStore.user.email || '',
            phone: userStore.user.phone || ''
        }
    }
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