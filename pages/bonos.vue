<template>
    <div class="space-y-8">
        <!-- Page Header -->
        <div class="text-center space-y-4">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900">
                Tus Bonos Exclusivos
            </h1>
            <p class="text-lg text-gray-600 max-w-xl mx-auto">
                Accede a recursos premium diseñados para acelerar tu transformación y maximizar tu potencial de alto rendimiento.
            </p>
        </div>

        <!-- Bonuses Grid -->
        <div class="grid md:grid-cols-2 gap-6">
            <!-- Bonus 1: 5 Patrones de Bloqueo -->
            <div class="card bg-gradient-to-br from-red-50 to-orange-50 border-red-200 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <LightBulbIcon class="w-6 h-6 text-red-600" />
                    </div>
                    <div class="flex-1 space-y-3">
                        <h3 class="text-lg font-bold text-gray-900">
                            Guía De Los 5 Patrones de Bloqueo Más Comunes del High Performer
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            Identifica tus patrones de autosabotaje y aprende a superarlos para alcanzar tu máximo potencial.
                        </p>
                        
                        <button
                            @click="openModal('Guía De Los 5 Patrones de Bloqueo Más Comunes del High Performer')"
                            class="btn-primary bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700 inline-flex items-center"
                        >
                            <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
                            Descargar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bonus 2: Audio de Activación -->
            <div class="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SpeakerWaveIcon class="w-6 h-6 text-blue-600" />
                    </div>
                    <div class="flex-1 space-y-3">
                        <h3 class="text-lg font-bold text-gray-900">
                            Audio de Activación Adicional "Enfoque Láser Para Modo Ejecución"
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            Potencia tu concentración y productividad con esta sesión de audio diseñada para activar tu modo ejecución.
                        </p>
                        <button
                            @click="openModal('Audio de Activación Adicional Enfoque Láser Para Modo Ejecución')"
                            class="btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 inline-flex items-center"
                        >
                            <PlayIcon class="w-4 h-4 mr-2" />
                            Escuchar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bonus 3: Desbloquea tu Ejecución -->
            <div class="card bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <KeyIcon class="w-6 h-6 text-purple-600" />
                    </div>
                    <div class="flex-1 space-y-3">
                        <h3 class="text-lg font-bold text-gray-900">
                            Guía "Desbloquea tu Ejecución: Por Qué el Mindset No es Suficiente"
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            Entiende por qué la motivación no basta y descubre las estrategias prácticas para ejecutar consistentemente.
                        </p>
                        <button
                            @click="openModal('Guía Desbloquea tu Ejecución Por Qué el Mindset No es Suficiente')"
                            class="btn-primary bg-purple-600 hover:bg-purple-700 border-purple-600 hover:border-purple-700 inline-flex items-center"
                        >
                            <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
                            Descargar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bonus 4: De la Idea a la Acción -->
            <div class="card bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <RocketLaunchIcon class="w-6 h-6 text-green-600" />
                    </div>
                    <div class="flex-1 space-y-3">
                        <h3 class="text-lg font-bold text-gray-900">
                            Guía Rápida "De la Idea a la Acción: El Activador de Consistencia"
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            Convierte ideas en micro-acciones ejecutables y construye el hábito de la consistencia.
                        </p>
                        <button
                            @click="openModal('Guía Rápida De la Idea a la Acción El Activador de Consistencia')"
                            class="btn-primary bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 inline-flex items-center"
                        >
                            <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
                            Descargar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bonus 5: Abundancia Financiera -->
            <div class="card bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CurrencyDollarIcon class="w-6 h-6 text-yellow-600" />
                    </div>
                    <div class="flex-1 space-y-3">
                        <h3 class="text-lg font-bold text-gray-900">
                            Guía "Las 3 Claves Para Activar Tu Abundancia Financiera Desde Hoy"
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            Rompe la mentalidad de escasez y atrae abundancia financiera con estrategias probadas.
                        </p>
                        <button
                            @click="openModal('Guía Las 3 Claves Para Activar Tu Abundancia Financiera Desde Hoy')"
                            class="btn-primary bg-yellow-600 hover:bg-yellow-700 border-yellow-600 hover:border-yellow-700 inline-flex items-center"
                        >
                            <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
                            Descargar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Bonus 6: 1-1 Call Booking -->
            <div class="card bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PhoneIcon class="w-6 h-6 text-blue-600" />
                    </div>
                    <div class="flex-1 space-y-3">
                        <h3 class="text-lg font-bold text-gray-900">
                            ¿Quieres acelerar tu transformación?
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            Agenda la Llamada de Desbloqueo 1-1 con el equipo de Memo y recibe ayuda personalizada para implementar tu plan en tu vida diaria.
                        </p>
                        <iframe
                          src="https://api.leadconnectorhq.com/widget/bookings/llamada-de-aceleracion"
                          width="100%"
                          height="600"
                          frameborder="0"
                          allowfullscreen
                          class="rounded-b-lg mt-6"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <Teleport to="body" v-if="isModalOpen">
            <div
                class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                @click.self="isModalOpen = false"
            >
                <div class="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
                    <!-- X Button -->
                    <button
                        @click="isModalOpen = false"
                        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        aria-label="Cerrar"
                    >
                        <XMarkIcon class="w-6 h-6" />
                    </button>
                    <div>
                        <component :is="modalComponent" :user="userStore.user || { name: '', mainActivity: '' }" />
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '~/stores/user'
import {
    LightBulbIcon,
    SpeakerWaveIcon,
    KeyIcon,
    RocketLaunchIcon,
    CurrencyDollarIcon,
    DocumentArrowDownIcon,
    PlayIcon,
    PhoneIcon,
    CalendarIcon,
    ClockIcon,
    XMarkIcon
} from '@heroicons/vue/24/outline'
import PatternBlocksGuide from '~/components/guides/PatternBlocksGuide.vue'
import LaserFocusAudio from '~/components/guides/LaserFocusAudio.vue'
import UnlockExecutionGuide from '~/components/guides/UnlockExecutionGuide.vue'
import IdeaToActionGuide from '~/components/guides/IdeaToActionGuide.vue'
import FinancialAbundanceGuide from '~/components/guides/FinancialAbundanceGuide.vue'

// Set page metadata
useHead({
    title: 'Bonos Exclusivos - Sistema de Activación',
    meta: [
        { name: 'description', content: 'Accede a bonos exclusivos y recursos premium para maximizar tu potencial de alto rendimiento' }
    ]
})

definePageMeta({
    middleware: ['auth']
})

const userStore = useUserStore()
const isModalOpen = ref(false)
const modalTitle = ref('')
const modalComponent = ref<any | null>(null)

// Restore body scroll when modal closes
watch(isModalOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Modal functions
function openModal(title: string) {
    modalTitle.value = title
    // Map title to component
    switch (title) {
        case 'Guía De Los 5 Patrones de Bloqueo Más Comunes del High Performer':
            modalComponent.value = PatternBlocksGuide
            break
        case 'Audio de Activación Adicional Enfoque Láser Para Modo Ejecución':
            modalComponent.value = LaserFocusAudio
            break
        case 'Guía Desbloquea tu Ejecución Por Qué el Mindset No es Suficiente':
            modalComponent.value = UnlockExecutionGuide
            break
        case 'Guía Rápida De la Idea a la Acción El Activador de Consistencia':
            modalComponent.value = IdeaToActionGuide
            break
        case 'Guía Las 3 Claves Para Activar Tu Abundancia Financiera Desde Hoy':
            modalComponent.value = FinancialAbundanceGuide
            break
        default:
            modalComponent.value = null
    }
    isModalOpen.value = true
    // Prevent body scroll when modal is open
    if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden'
    }
}

function closeModal() {
    isModalOpen.value = false
    modalTitle.value = ''
    modalComponent.value = null
    // Restore body scroll when modal is closed
    if (typeof document !== 'undefined') {
        document.body.style.overflow = ''
    }
}
</script> 