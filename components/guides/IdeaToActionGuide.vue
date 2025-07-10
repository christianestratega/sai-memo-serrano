<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="text-center space-y-4">
      <h1 class="text-3xl font-bold text-gray-900">
        De la Idea a la Acción: El Activador de Consistencia
      </h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        No te faltan ideas. Lo que te falta es el músculo de la ejecución diaria.
        La diferencia entre los que admiras y el resto no está en sus sueños, sino en su disciplina para mover una idea a la realidad.
      </p>
      <p class="text-gray-700 font-medium">
        Esta guía es tu manual práctico para dejar de solo pensar y empezar a ejecutar con consistencia real.
      </p>
    </div>

    <!-- Mini-gráfica -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">El Problema de la Consistencia</h2>
      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-red-600">8%</div>
          <p class="text-sm text-gray-600">de las personas ejecuta de manera consistente una nueva idea por más de 30 días</p>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-gray-600">92%</div>
          <p class="text-sm text-gray-600">abandona antes de ver resultados</p>
        </div>
      </div>
      <div class="h-64">
        <Doughnut :data="consistencyChartData" :options="consistencyChartOptions" />
      </div>
      <p class="text-sm text-gray-600 mt-2 text-center">
        <span class="font-medium">Fuente:</span> Journal of Clinical Psychology
      </p>
    </div>

    <!-- 1. El enemigo de la consistencia -->
    <div class="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        1. El enemigo de la consistencia: la falsa motivación
      </h2>
      <p class="text-gray-700 mb-4">
        Dejar tu avance al "ánimo" del día es la receta perfecta para la mediocridad.
      </p>
      
      <div class="bg-white rounded-lg p-6 shadow border-l-4 border-orange-500">
        <div class="flex items-start space-x-3">
          <div class="text-orange-500 text-2xl">💬</div>
          <div>
            <p class="text-gray-700 italic text-lg">
              "El progreso real es incómodo y a veces aburrido, pero el que se entrena a ejecutar aunque no tenga ganas, termina ganando."
            </p>
            <p class="text-orange-600 font-semibold mt-2">— Memo Serrano</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. El sistema de micro-acciones -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        2. El sistema de micro-acciones
      </h2>
      <p class="text-gray-700 mb-4">
        La consistencia se construye en pequeño, no en grande.
        ¿Quieres resultados exponenciales?
        Convierte tu idea grande en microacciones diarias, tan pequeñas que no puedas fallar.
      </p>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Escribe una idea grande que tienes:
          </label>
          <textarea
            v-model="idea"
            @input="saveToLocalStorage('idea_to_action_big_idea', idea)"
            placeholder="Ejemplo: Lanzar un nuevo producto digital"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ahora, divídela en la microacción que harás HOY:
          </label>
          <textarea
            v-model="microAction"
            @input="saveToLocalStorage('idea_to_action_micro_action', microAction)"
            placeholder="Ejemplo: Escribir el guion del primer video de venta"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- 3. Bloquea tu "ventana de acción" -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        3. Bloquea tu "ventana de acción"
      </h2>
      <p class="text-gray-700 mb-4">
        No intentes "encontrar tiempo".
        Bloquea 30 minutos fijos cada día para avanzar, sin excusas, en esa microacción.
        Al inicio, tu cerebro va a resistirse. Hazlo de todos modos.
      </p>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 class="font-semibold text-yellow-800 mb-2">⏰ Consejo Clave:</h3>
        <p class="text-yellow-700">
          Las personas que calendarizan sus acciones diarias tienen <strong>3x más probabilidad</strong> de completar proyectos personales o de negocio.
        </p>
        <p class="text-xs text-yellow-600 mt-1">Fuente: American Psychological Association</p>
      </div>
    </div>

    <!-- Mini-gráfica: Calendarización -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">El Poder de la Calendarización</h3>
      <div class="h-64">
        <Bar :data="calendarChartData" :options="calendarChartOptions" />
      </div>
      <p class="text-sm text-gray-600 mt-2 text-center">
        Probabilidad de completar proyectos: Calendarizados vs. No calendarizados
      </p>
    </div>

    <!-- 4. Cómo sostener la consistencia -->
    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        4. Cómo sostener la consistencia incluso en días malos
      </h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-green-700 mb-2">🚫 Cero excusas</h3>
          <p class="text-sm text-gray-700">Si no puedes con la acción completa, haz la versión mínima.</p>
        </div>
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-emerald-700 mb-2">📝 Registra tu avance</h3>
          <p class="text-sm text-gray-700">En Notion, libreta o tracker digital.</p>
        </div>
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-green-700 mb-2">🎉 Celebra microganancias</h3>
          <p class="text-sm text-gray-700">No solo el resultado final.</p>
        </div>
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-emerald-700 mb-2">👥 Socio de responsabilidad</h3>
          <p class="text-sm text-gray-700">Alguien a quien rendirle cuentas cada semana.</p>
        </div>
      </div>
    </div>

    <!-- 5. Ritual de Consistencia -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        5. Ritual de Consistencia (Memo Serrano)
      </h2>
      <div class="space-y-3">
        <div class="flex items-start space-x-3">
          <div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
          <p class="text-gray-700">Escribe tu acción clave del día cada mañana.</p>
        </div>
        <div class="flex items-start space-x-3">
          <div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
          <p class="text-gray-700">Agenda tu "ventana de acción" (mínimo 30 min).</p>
        </div>
        <div class="flex items-start space-x-3">
          <div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
          <p class="text-gray-700">Ejecuta aunque no tengas ganas.</p>
        </div>
        <div class="flex items-start space-x-3">
          <div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">4</div>
          <p class="text-gray-700">Al final del día, registra tu avance.</p>
        </div>
        <div class="flex items-start space-x-3">
          <div class="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">5</div>
          <p class="text-gray-700">Si fallas un día, no te castigues: vuelve a empezar mañana sin drama.</p>
        </div>
      </div>
    </div>

    <!-- 6. Frase de poder -->
    <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white">
      <h2 class="text-2xl font-semibold mb-4">6. Frase de poder</h2>
      <div class="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
        <p class="text-xl italic mb-4">
          "Hoy ejecuto, no importa si tengo ganas. La acción diaria es la única forma de lograr lo que nadie más logra."
        </p>
        <button
          @click="copyPowerPhrase"
          class="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>{{ copySuccess ? '¡Copiado!' : 'Copiar frase' }}</span>
          <svg v-if="!copySuccess" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 7. Reflexión final -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Reflexión final</h2>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          ¿Cuál es la microacción que vas a ejecutar HOY sí o sí?
        </label>
        <textarea
          v-model="todayAction"
          @input="saveToLocalStorage('idea_to_action_today_action', todayAction)"
          placeholder="Describe la acción específica que harás hoy..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          rows="3"
        ></textarea>
      </div>
    </div>

    <!-- 8. CTA -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
      <h2 class="text-3xl font-bold mb-4">¿Listo para dejar de posponer y multiplicar tus resultados?</h2>
      <p class="text-xl mb-6 opacity-90">
        Agenda tu <strong>Llamada de Desbloqueo 1-1 con el equipo de Memo</strong> para recibir estrategias y accountability personalizado para que tus ideas finalmente se conviertan en realidad.
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bar, Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

// Reactive data
const idea = ref('')
const microAction = ref('')
const todayAction = ref('')
const copySuccess = ref(false)

// Chart data for consistency problem
const consistencyChartData = {
  labels: ['Ejecutan consistentemente', 'Abandonan antes de resultados'],
  datasets: [
    {
      data: [8, 92],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 2
    }
  ]
}

const consistencyChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true
      }
    }
  }
}

// Chart data for calendarization
const calendarChartData = {
  labels: ['Calendarizados', 'No calendarizados'],
  datasets: [
    {
      label: 'Probabilidad de completar proyectos',
      data: [75, 25],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(156, 163, 175, 0.8)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(156, 163, 175, 1)'
      ],
      borderWidth: 1
    }
  ]
}

const calendarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: function(value: number) {
          return value + '%'
        }
      }
    }
  }
}

// Copy to clipboard function
const copyPowerPhrase = async () => {
  const phrase = "Hoy ejecuto, no importa si tengo ganas. La acción diaria es la única forma de lograr lo que nadie más logra."
  
  try {
    await navigator.clipboard.writeText(phrase)
    copySuccess.value = true
    setTimeout(() => {
      copySuccess.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Local storage functions
const saveToLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value)
  }
}

const loadFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || ''
  }
  return ''
}

// Load saved data on mount
onMounted(() => {
  idea.value = loadFromLocalStorage('idea_to_action_big_idea')
  microAction.value = loadFromLocalStorage('idea_to_action_micro_action')
  todayAction.value = loadFromLocalStorage('idea_to_action_today_action')
})
</script> 