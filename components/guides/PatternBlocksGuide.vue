<template>
  <div>
    <div v-if="!user && isDevMode" class="mb-4 p-3 rounded bg-yellow-100 text-yellow-800 text-center font-semibold">
      DEV MODE: Mostrando la guía sin diagnóstico completado
    </div>
    <!-- Headline full width -->
    <div class="w-full py-6">
      <h1 class="text-3xl md:text-4xl font-bold text-primary-700 text-center">Guía Visual de los 5 Patrones de Bloqueo del High Performer</h1>
    </div>
    <div v-if="user || isDevMode" class="max-w-4xl mx-auto space-y-8">
      <!-- Header Stats Section -->
      <div class="mb-8">
        <div class="grid md:grid-cols-3 gap-6 items-stretch">
          <!-- Chart (2/3 width on desktop) -->
          <div class="md:col-span-2 flex items-center justify-center">
            <BarChart :data="chartData" :labels="chartLabels" class="w-full h-64" />
          </div>
          <!-- Stats (1/3 width on desktop, stacked on mobile) -->
          <div class="flex flex-col gap-4 justify-center">
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 flex-1 flex items-center">
              <div>
                <div class="text-lg font-semibold text-blue-800">El 88 % de profesionales procrastina al menos 1 hora al día en su trabajo</div>
                <div class="text-xs text-blue-600 mt-1">Fuente: quidlo.com</div>
              </div>
            </div>
            <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex-1 flex items-center">
              <div>
                <div class="text-lg font-semibold text-yellow-800">El 45 % batalla con perfeccionismo paralizante</div>
                <div class="text-xs text-yellow-600 mt-1">Fuente: American Psychological Association</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center text-sm text-gray-600 mb-8">Basado en estudios globales para profesionales y emprendedores.</div>

      <!-- Patterns Section -->
      <div class="space-y-8">
        <div v-for="pattern in patterns" :key="pattern.key" class="w-full rounded-xl shadow-lg border-2 border-gray-200 bg-white p-6 space-y-4">
          <!-- Pattern Header -->
          <div class="flex items-center gap-4">
            <component :is="pattern.icon" :class="'w-12 h-12 text-' + pattern.color + '-500'" />
            <div class="flex-1">
              <div class="flex items-center gap-3">
                <h2 class="text-2xl font-bold text-gray-800">{{ pattern.title }}</h2>
                <span :class="'px-3 py-1 rounded-full text-sm font-bold bg-' + pattern.color + '-100 text-' + pattern.color + '-800'">{{ pattern.stat }}</span>
              </div>
            </div>
          </div>

          <!-- Pattern Content -->
          <div class="space-y-4">
            <div>
              <h3 class="font-semibold text-gray-800 mb-2">Definición:</h3>
              <p class="text-gray-700">{{ pattern.definition }}</p>
            </div>
            
            <div>
              <h3 class="font-semibold text-gray-800 mb-2">Ejemplo:</h3>
              <p class="text-gray-700 italic">{{ pattern.example }}</p>
            </div>
            
            <div>
              <h3 class="font-semibold text-gray-800 mb-2">¿Por qué lo haces?:</h3>
              <p class="text-gray-700">{{ pattern.why }}</p>
            </div>
            
            <div :class="'bg-' + pattern.color + '-50 border border-' + pattern.color + '-200 rounded-lg p-4'">
              <h3 class="font-semibold text-gray-800 mb-2">Memo te dice:</h3>
              <p class="text-gray-700">{{ pattern.memoSays }}</p>
            </div>
            
            <div>
              <h3 class="font-semibold text-gray-800 mb-2">Micro-acción recomendada:</h3>
              <p class="text-gray-700 font-medium">{{ pattern.microAction }}</p>
            </div>

            <!-- Interactive Poll -->
            <div class="border-t pt-4">
              <h3 class="font-semibold text-gray-800 mb-3">¿Te identificas con este patrón?</h3>
              <div class="flex gap-3">
                <button 
                  @click="setPatternPoll(pattern.key, true)"
                  :class="'px-4 py-2 rounded-lg font-medium transition-colors ' + (patternPolls[pattern.key] === true ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')"
                >
                  Sí
                </button>
                <button 
                  @click="setPatternPoll(pattern.key, false)"
                  :class="'px-4 py-2 rounded-lg font-medium transition-colors ' + (patternPolls[pattern.key] === false ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')"
                >
                  No
                </button>
              </div>
              <div v-if="patternPolls[pattern.key] !== null" class="mt-2 text-sm text-gray-600">
                {{ patternPolls[pattern.key] ? '¡Reconocer el patrón es el primer paso para cambiarlo!' : '¡Excelente! Mantén esa claridad.' }}
              </div>
            </div>

            <!-- Micro-action Input -->
            <div class="border-t pt-4">
              <h3 class="font-semibold text-gray-800 mb-2">¿Cuál microacción harás hoy para romper este patrón?</h3>
              <textarea 
                v-model="patternActions[pattern.key]" 
                @input="savePatternAction(pattern.key)"
                rows="2" 
                class="w-full rounded border border-gray-300 p-3 focus:ring-2 focus:ring-primary-400 resize-none"
                :placeholder="'Ejemplo: ' + pattern.microAction"
              ></textarea>
              <div v-if="patternActions[pattern.key]" class="text-green-600 text-sm mt-1">¡Guardado!</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Micro-rituales recomendados -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 class="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
          <component :is="ClockIcon" class="w-6 h-6" />
          Micro-rituales recomendados
        </h2>
        <div class="space-y-3">
          <div v-for="ritual in rituals" :key="ritual.key" class="flex items-center gap-3">
            <input 
              type="checkbox" 
              :id="ritual.key"
              v-model="ritualChecklist[ritual.key]"
              @change="saveRitualChecklist"
              class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label :for="ritual.key" class="flex items-center gap-2 text-gray-700 cursor-pointer">
              <component :is="ritual.icon" class="w-5 h-5 text-blue-500" />
              <span :class="ritualChecklist[ritual.key] ? 'line-through text-gray-500' : ''">{{ ritual.label }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Frase de poder -->
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
        <h2 class="text-2xl font-bold text-emerald-800 mb-4 flex items-center justify-center gap-2">
          <component :is="SparklesIcon" class="w-6 h-6" />
          Frase de poder
        </h2>
        <div class="bg-white rounded-lg p-4 mb-4">
          <p class="text-lg italic text-emerald-800 mb-3">"Hoy decido avanzar aunque no sea perfecto. Mi progreso está por encima de mis excusas. Cada día acciono, sin miedo al juicio ni a la incomodidad."</p>
          <button 
            @click="copyToClipboard"
            class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            {{ copied ? '¡Copiado!' : 'Copiar frase' }}
          </button>
        </div>
      </div>

      <!-- Reflection textarea -->
      <div class="bg-primary-50 border border-primary-200 rounded-xl p-6">
        <h3 class="text-xl font-bold text-primary-800 mb-4 flex items-center gap-2">
          <component :is="PencilIcon" class="w-5 h-5" />
          Reflexión final
        </h3>
        <p class="text-gray-700 mb-3">¿Cuál es tu patrón dominante y tu micro-acción para romperlo hoy?</p>
        <textarea 
          v-model="finalReflection" 
          @input="saveFinalReflection"
          rows="4" 
          class="w-full rounded border border-primary-200 p-3 focus:ring-2 focus:ring-primary-400 resize-none"
          placeholder="Describe tu patrón más frecuente y la acción específica que tomarás hoy..."
        ></textarea>
        <div v-if="finalReflectionSaved" class="text-green-600 text-sm mt-2">¡Reflexión guardada!</div>
      </div>

      <!-- Premium CTA -->
      <div class="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">¿Listo para romper tu patrón y acelerar tu negocio?</h2>
        <p class="text-xl mb-6 opacity-90">Agenda tu Llamada de Desbloqueo 1-1 con el equipo de Memo. Personaliza tu plan y ejecuta sin excusas.</p>
        <a 
            href="#" 
            @click.prevent="openBookingPopup" 
            class="btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 inline-flex items-center gap-2"
        >
            Agendar Llamada 1-1
        </a>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center space-y-6 py-8">
      <p class="text-lg text-gray-700 text-center">Para acceder a tu guía personalizada, primero completa el diagnóstico.</p>
      <NuxtLink to="/diagnostico" class="btn-primary text-lg px-8 py-4">Completar Diagnóstico</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  LightBulbIcon, BoltIcon, ArrowPathIcon, EyeDropperIcon, UserGroupIcon, 
  SparklesIcon, ClockIcon, PencilIcon, BookOpenIcon, FireIcon, HeartIcon,
  CheckCircleIcon, PlayIcon, StarIcon, CalendarIcon
} from '@heroicons/vue/24/outline'
import BarChart from './PatternStatsBarChart.vue'
import { useBookingModal } from '~/composables/useBookingModal'
const { open: openBookingPopup } = useBookingModal()

const props = defineProps<{ user?: { name?: string, mainActivity?: string } }>()

const isDevMode = computed(() => {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
})

const user = props.user

// Chart data
const chartLabels = ['Procrastinación', 'Perfeccionismo', 'Hiperacción', 'Foco Disperso', 'Miedo al Qué Dirán']
const chartData = [88, 45, 15, 10, 5]

// Patterns data
const patterns = [
  {
    key: 'procrastinacion',
    title: 'Procrastinación Crónica',
    color: 'red',
    icon: LightBulbIcon,
    stat: '88%',
    definition: 'Procrastinar no es flojera. Es evitar lo que más impacta tu negocio, disfrazando el miedo con tareas de baja importancia.',
    example: 'Tienes que hacer llamadas clave, pero terminas ajustando el logo o revisando emails.',
    why: 'Miedo al rechazo o fracaso, dificultad para tolerar la incomodidad.',
    memoSays: 'Si postergas lo importante, tu negocio se estanca. No necesitas motivación, necesitas compromiso. La acción imperfecta es más valiosa que la planeación eterna.',
    microAction: 'Haz primero hoy lo que más te incomoda.'
  },
  {
    key: 'perfeccionismo',
    title: 'Perfeccionismo Paralizante',
    color: 'yellow',
    icon: BoltIcon,
    stat: '45%',
    definition: 'Prefieres no mostrar tu proyecto hasta que esté perfecto. El perfeccionismo tóxico paraliza más que cualquier error.',
    example: 'Tienes el embudo listo pero llevas meses ajustando detalles.',
    why: 'Confundes excelencia con miedo a fallar o al juicio.',
    memoSays: 'El mercado premia lo real y útil, no lo perfecto. El que lanza y mejora, gana. El que espera, desaparece.',
    microAction: 'Lanza hoy una versión beta de tu producto o servicio y recoge feedback.'
  },
  {
    key: 'hiperaccion',
    title: 'Hiperacción Sin Dirección',
    color: 'blue',
    icon: ArrowPathIcon,
    stat: '15%',
    definition: 'Estás siempre ocupado pero nada esencial avanza. Saltas de tarea en tarea, pero ninguna realmente mueve el negocio.',
    example: 'Reuniones, mensajes y tareas menores llenan tu agenda, pero tus proyectos clave no se completan.',
    why: 'Evitas el foco porque da miedo enfrentar lo importante; confundes movimiento con progreso.',
    memoSays: 'Hacer de todo cansa pero no te lleva a ningún lado. Haz menos, pero hazlo con brutal honestidad y dirección.',
    microAction: 'Elige solo 3 prioridades hoy. Todo lo demás es accesorio.'
  },
  {
    key: 'foco',
    title: 'Foco Disperso',
    color: 'purple',
    icon: EyeDropperIcon,
    stat: '10%',
    definition: 'Saltas de idea en idea, comienzas muchos proyectos y no terminas ninguno. Te agotas sin resultado real.',
    example: 'Empiezas campañas, cursos o nuevas ideas pero nada se completa ni monetiza.',
    why: 'Buscas la dopamina de lo nuevo; falta de priorización y cierre de ciclos.',
    memoSays: 'No necesitas más ideas, necesitas cerrar y capitalizar las que tienes. El dinero y libertad están en lo terminado.',
    microAction: 'Bloquea 1 hora para una sola tarea, sin distracciones, hasta terminarla.'
  },
  {
    key: 'miedo',
    title: 'Miedo al Qué Dirán',
    color: 'emerald',
    icon: UserGroupIcon,
    stat: '5%',
    definition: 'Saboteas o pospones por miedo a la crítica o rechazo de otros (clientes, socios, familia).',
    example: 'No lanzas un servicio nuevo porque "qué van a decir si no vendo".',
    why: 'Buscas validación externa, miedo al fracaso público.',
    memoSays: 'Nadie que hoy admiras empezó perfecto. Tu misión es impactar, no agradar. El valor está en atreverte, no en complacer.',
    microAction: 'Comparte tu avance hoy mismo con alguien, aunque no esté listo ni perfecto.'
  }
]

// Rituals data
const rituals = [
  { key: 'journaling', label: 'Journaling diario: ¿Qué patrón apareció hoy y cómo lo enfrenté?', icon: BookOpenIcon },
  { key: 'meditacion', label: 'Meditación 5 min antes de tomar decisiones clave', icon: HeartIcon },
  { key: 'celebrar', label: 'Celebrar cada microavance', icon: StarIcon },
  { key: 'pomodoro', label: 'Técnica Pomodoro: 25 min acción, 5 min pausa', icon: ClockIcon },
  { key: 'agendar', label: 'Agendar la "tarea incómoda" al inicio del día', icon: CalendarIcon }
]

// Interactive state
const patternPolls = ref<Record<string, boolean | null>>({})
const patternActions = ref<Record<string, string>>({})
const ritualChecklist = ref<Record<string, boolean>>({})
const finalReflection = ref('')
const finalReflectionSaved = ref(false)
const copied = ref(false)

// LocalStorage keys
const POLLS_KEY = 'patternGuidePolls'
const ACTIONS_KEY = 'patternGuideActions'
const RITUALS_KEY = 'patternGuideRituals'
const REFLECTION_KEY = 'patternGuideReflection'

// Functions
function setPatternPoll(patternKey: string, value: boolean) {
  patternPolls.value[patternKey] = value
  localStorage.setItem(POLLS_KEY, JSON.stringify(patternPolls.value))
}

function savePatternAction(patternKey: string) {
  localStorage.setItem(ACTIONS_KEY, JSON.stringify(patternActions.value))
}

function saveRitualChecklist() {
  localStorage.setItem(RITUALS_KEY, JSON.stringify(ritualChecklist.value))
}

function saveFinalReflection() {
  localStorage.setItem(REFLECTION_KEY, finalReflection.value)
  finalReflectionSaved.value = true
  setTimeout(() => { finalReflectionSaved.value = false }, 2000)
}

async function copyToClipboard() {
  const text = "Hoy decido avanzar aunque no sea perfecto. Mi progreso está por encima de mis excusas. Cada día acciono, sin miedo al juicio ni a la incomodidad."
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Load saved data on mount
onMounted(() => {
  if (typeof window === 'undefined') return
  
  // Load polls
  const savedPolls = localStorage.getItem(POLLS_KEY)
  if (savedPolls) {
    patternPolls.value = JSON.parse(savedPolls)
  }
  
  // Load actions
  const savedActions = localStorage.getItem(ACTIONS_KEY)
  if (savedActions) {
    patternActions.value = JSON.parse(savedActions)
  }
  
  // Load rituals
  const savedRituals = localStorage.getItem(RITUALS_KEY)
  if (savedRituals) {
    ritualChecklist.value = JSON.parse(savedRituals)
  }
  
  // Load reflection
  const savedReflection = localStorage.getItem(REFLECTION_KEY)
  if (savedReflection) {
    finalReflection.value = savedReflection
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style> 