<template>
    <div class="space-y-8">
        <!-- Page Header -->
        <div class="text-center space-y-4">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
                Diagnóstico Inicial
            </h1>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                Completa este formulario para recibir un diagnóstico personalizado y un plan de acción adaptado a tus necesidades específicas.
            </p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="max-w-2xl mx-auto">
            <div class="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p class="text-red-700 text-base mb-4">{{ errorMsg }}</p>
                <button class="btn-primary" @click="errorMsg = ''">Reintentar</button>
            </div>
        </div>

        <!-- Completed Diagnosis View -->
        <div v-else-if="userStore.hasDiagnosis && !shouldShowForm" class="max-w-4xl mx-auto">
            <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 shadow-lg">
                <div class="text-center space-y-6">
                    <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircleIcon class="w-10 h-10 text-green-600" />
                    </div>
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold text-gray-900">
                            ¡Ya completaste tu diagnóstico del Sistema de Activación Interna™!
                        </h2>
                        <p class="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                            Ahora tienes acceso a tu plan personalizado de alto rendimiento. 
                            Puedes revisar tus resultados, ver tu progreso en el dashboard o volver a hacer tu diagnóstico para actualizar tu plan.
                        </p>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <NuxtLink 
                            to="/resultados" 
                            class="btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 inline-flex items-center gap-2"
                        >
                            <EyeIcon class="w-5 h-5" />
                            Ver Resultados
                        </NuxtLink>
                        
                        <NuxtLink 
                            to="/dashboard" 
                            class="btn-secondary inline-flex items-center gap-2"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Ir al Dashboard
                        </NuxtLink>
                        
                        <button 
                            @click="handleResetDiagnosis"
                            class="btn-secondary inline-flex items-center gap-2"
                        >
                            <ArrowPathIcon class="w-5 h-5" />
                            Rehacer Diagnóstico
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Diagnosis Form View -->
        <div v-else class="max-w-4xl mx-auto">
            <DiagnosisForm @diagnosis-completed="handleDiagnosisCompleted" />
            <div v-if="isSaving" class="text-center mt-6">
                <span class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500">
                    Guardando diagnóstico...
                </span>
            </div>
        </div>

        <!-- Reset Confirmation Modal -->
        <Teleport to="body">
            <div
                v-if="showResetModal"
                class="fixed inset-0 z-50 flex items-center justify-center"
                style="background-color: rgba(0, 0, 0, 0.5);"
            >
                <div class="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4">
                    <div class="text-center space-y-4">
                        <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                            <ExclamationTriangleIcon class="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900">
                            ¿Estás seguro?
                        </h3>
                        <p class="text-gray-600">
                            Al rehacer tu diagnóstico, perderás tu plan personalizado actual. 
                            ¿Quieres continuar?
                        </p>
                        <div class="flex gap-3 justify-center">
                            <button 
                                @click="confirmReset"
                                class="btn-primary bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
                            >
                                Sí, rehacer diagnóstico
                            </button>
                            <button 
                                @click="showResetModal = false"
                                class="btn-secondary"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { CheckCircleIcon, EyeIcon, ArrowPathIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

// Set page metadata
useHead({
    title: 'Diagnóstico - Sistema de Activación',
    meta: [
        { name: 'description', content: 'Completa tu diagnóstico personalizado' }
    ]
})

definePageMeta({
    middleware: ['auth']
})

const userStore = useUserStore()
const errorMsg = ref('')
const isSaving = ref(false)
const showResetModal = ref(false)
const showForm = ref(false)

// Check if we should show the form (for reset functionality)
const route = useRoute()
const shouldShowForm = computed(() => {
    return showForm.value || route.query.reset === '1'
})

// Check authentication and diagnosis status on mount
onMounted(async () => {
    await userStore.checkAuth()
})

const handleDiagnosisCompleted = async (data: { answers: any, resultKey: string }) => {
    errorMsg.value = ''
    isSaving.value = true
    try {
        await userStore.saveDiagnosis(data.answers, data.resultKey)
        await navigateTo('/resultados')
    } catch (error) {
        errorMsg.value = 'Ocurrió un error al guardar tu diagnóstico. Por favor, inténtalo de nuevo.'
    } finally {
        isSaving.value = false
    }
}

const handleResetDiagnosis = () => {
    showResetModal.value = true
}

const confirmReset = async () => {
    try {
        // Delete the current diagnosis
        await userStore.deleteDiagnosis()
        
        // Close modal and show form
        showResetModal.value = false
        showForm.value = true
        
        // Clear any query parameters
        await navigateTo('/diagnostico', { replace: true })
        
    } catch (error) {
        errorMsg.value = 'Error al eliminar el diagnóstico. Por favor, inténtalo de nuevo.'
        showResetModal.value = false
    }
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