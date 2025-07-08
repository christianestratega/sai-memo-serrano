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

        <!-- Existing Diagnosis Summary -->
        <div v-else-if="userStore.hasDiagnosis" class="max-w-4xl mx-auto">
            <div class="bg-white rounded-xl p-8 shadow-sm border">
                <div class="text-center space-y-6">
                    <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircleIcon class="w-8 h-8 text-green-600" />
                    </div>
                    
                    <div class="space-y-4">
                        <h2 class="text-2xl font-bold text-gray-900">Ya tienes un diagnóstico</h2>
                        <p class="text-gray-600 max-w-2xl mx-auto">
                            Ya completaste el diagnóstico anteriormente. Puedes ver tus resultados o realizar un nuevo diagnóstico.
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
                        
                        <button 
                            @click="handleRetakeDiagnosis"
                            :disabled="isDeleting"
                            class="btn-primary bg-gray-600 hover:bg-gray-700 border-gray-600 hover:border-gray-700 inline-flex items-center gap-2 disabled:opacity-50"
                        >
                            <ArrowPathIcon class="w-5 h-5" />
                            <span v-if="isDeleting">Eliminando...</span>
                            <span v-else>Realizar Nuevo Diagnóstico</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- New Diagnosis Form -->
        <div v-else class="max-w-4xl mx-auto">
            <DiagnosisForm @diagnosis-completed="handleDiagnosisCompleted" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, EyeIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'

// Set page metadata
useHead({
    title: 'Diagnóstico - Sistema de Activación',
    meta: [
        { name: 'description', content: 'Completa tu diagnóstico personalizado' }
    ]
})

// Add auth middleware
definePageMeta({
    middleware: ['auth']
})

const userStore = useUserStore()
const isDeleting = ref(false)

const handleDiagnosisCompleted = async (data: { answers: any, resultKey: string }) => {
    try {
        await userStore.saveDiagnosis(data.answers, data.resultKey)
        await navigateTo('/resultados')
    } catch (error) {
        console.error('Error saving diagnosis:', error)
        // Handle error (show notification, etc.)
    }
}

const handleRetakeDiagnosis = async () => {
    isDeleting.value = true
    try {
        await userStore.deleteDiagnosis()
        // The page will automatically re-render and show the form
    } catch (error) {
        console.error('Error deleting diagnosis:', error)
        // Handle error
    } finally {
        isDeleting.value = false
    }
}
</script>

<style scoped>
.btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-colors duration-200;
}
</style>