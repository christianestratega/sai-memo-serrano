<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <!-- Header -->
    <div class="text-center space-y-4">
      <h1 class="text-3xl font-bold text-gray-900">
        Las 3 Claves Para Activar Tu Abundancia Financiera Desde Hoy
      </h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        La abundancia financiera no es solo cuestión de mentalidad positiva ni de manifestar en silencio.
        Es el resultado de reprogramar tu relación con el dinero, tus acciones diarias y tu círculo de influencia.
      </p>
    </div>

    <!-- Mentalidad Financiera Chart -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Mentalidad Financiera: Datos Clave</h2>
      <div class="grid md:grid-cols-3 gap-6 mb-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600">92%</div>
          <p class="text-sm text-gray-600">de las preocupaciones sobre dinero nunca suceden realmente</p>
          <p class="text-xs text-gray-500 mt-1">Fuente: APA, 2020</p>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600">85%</div>
          <p class="text-sm text-gray-600">de empresarios exitosos trabajan en su mentalidad financiera</p>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-600">15%</div>
          <p class="text-sm text-gray-600">de las personas actúan de inmediato ante oportunidades</p>
        </div>
      </div>
      <div class="h-64">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Índice -->
    <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Índice</h2>
      <ol class="space-y-2 text-gray-700">
        <li>1. Rompe tus creencias limitantes sobre el dinero</li>
        <li>2. Clave 1: Acción Proactiva Diaria</li>
        <li>3. Clave 2: Red de Oportunidades (Relaciones)</li>
        <li>4. Clave 3: Visualización y Reprogramación Diaria</li>
        <li>5. Herramientas prácticas para abundancia inmediata</li>
        <li>6. Caso de éxito: Del autosabotaje a la facturación exponencial</li>
        <li>7. Ritual diario para activar la abundancia</li>
        <li>8. Reflexión y compromiso personal</li>
        <li>9. Llamado a la acción: tu siguiente paso</li>
      </ol>
    </div>

    <!-- 1. Creencias Limitantes -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">
        1. Rompe tus creencias limitantes sobre el dinero
      </h2>
      <p class="text-gray-700 mb-6">
        El dinero no es bueno ni malo. Es una herramienta, no un reflejo de tu valor personal.
        Lo que determina tu realidad financiera son tus creencias y cómo las traduces en acción.
      </p>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Escribe la frase que más escuchabas sobre el dinero en tu infancia:
          </label>
          <textarea
            v-model="beliefs.old"
            @input="saveToLocalStorage('financial_old_belief', beliefs.old)"
            placeholder="Ejemplo: 'El dinero es difícil de ganar'"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ahora, escríbela reprogramada:
          </label>
          <textarea
            v-model="beliefs.new"
            @input="saveToLocalStorage('financial_new_belief', beliefs.new)"
            placeholder="Ejemplo: 'El dinero fluye a mí porque aporto valor'"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="2"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- 2. Clave 1: Acción Proactiva -->
    <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
      <div class="flex items-center mb-4">
        <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
          1
        </div>
        <h2 class="text-2xl font-semibold text-gray-900">Clave 1: Acción Proactiva Diaria</h2>
      </div>
      
      <p class="text-gray-700 mb-4">
        La abundancia financiera no se manifiesta con afirmaciones, sino con movimiento.
        Los emprendedores que más facturan son los que actúan rápido, aunque no tengan certeza total.
      </p>

      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-green-700 mb-2">💡 Ejemplo Memo:</h3>
          <p class="text-sm text-gray-700">Lanzar tu oferta hoy, aunque no esté perfecta, vale más que planearla 6 meses.</p>
        </div>
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-blue-700 mb-2">📊 Dato:</h3>
          <p class="text-sm text-gray-700">El 15% de las oportunidades desaparecen en menos de 24h si no actúas.</p>
        </div>
      </div>

      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <h3 class="font-semibold text-yellow-800 mb-2">🎯 Consejo práctico:</h3>
        <p class="text-yellow-700">
          Haz cada día una acción directa relacionada con dinero:
          Llama a un prospecto, haz un upsell, publica una oferta, invierte en aprendizaje o networking.
        </p>
      </div>
    </div>

    <!-- Gráfica: Velocidad de Acción -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Velocidad de Acción = Abundancia</h3>
      <div class="h-64">
        <Bar :data="actionChartData" :options="actionChartOptions" />
      </div>
      <p class="text-sm text-gray-600 mt-2 text-center">
        Los emprendedores que actúan en las primeras 48h facturan 4x más en promedio que quienes postergan.
        <br><span class="font-medium">Fuente: HubSpot Research, 2021</span>
      </p>
    </div>

    <!-- 3. Clave 2: Red de Oportunidades -->
    <div class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
      <div class="flex items-center mb-4">
        <div class="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
          2
        </div>
        <h2 class="text-2xl font-semibold text-gray-900">Clave 2: Red de Oportunidades (Relaciones)</h2>
      </div>
      
      <p class="text-gray-700 mb-4">
        El dinero siempre viaja a través de relaciones.
        Tu red determina tus ingresos y tu crecimiento.
      </p>

      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-purple-700 mb-2">💡 Ejemplo Memo:</h3>
          <p class="text-sm text-gray-700">Mis mayores saltos de facturación vinieron de una conversación estratégica, no de trabajar más horas.</p>
        </div>
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-pink-700 mb-2">📊 Dato:</h3>
          <p class="text-sm text-gray-700">El 80% de las oportunidades de negocio llegan por recomendaciones, no por publicidad directa.</p>
          <p class="text-xs text-gray-500 mt-1">LinkedIn, 2023</p>
        </div>
      </div>

      <div class="bg-blue-50 border-l-4 border-blue-400 p-4">
        <h3 class="font-semibold text-blue-800 mb-2">🎯 Consejo práctico:</h3>
        <p class="text-blue-700">
          Cada semana, agenda 2 conversaciones estratégicas:
          Un mensaje a un ex-cliente, una llamada a un potencial socio, o participa en una comunidad de alto nivel.
        </p>
      </div>
    </div>

    <!-- 4. Clave 3: Visualización -->
    <div class="bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-lg p-6">
      <div class="flex items-center mb-4">
        <div class="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3">
          3
        </div>
        <h2 class="text-2xl font-semibold text-gray-900">Clave 3: Visualización y Reprogramación Diaria</h2>
      </div>
      
      <p class="text-gray-700 mb-4">
        Tu mente filtra y selecciona oportunidades según tus creencias.
        Si crees que el dinero es escaso, dejarás pasar oportunidades todos los días.
      </p>

      <div class="grid md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-indigo-700 mb-2">💡 Ejemplo Memo:</h3>
          <p class="text-sm text-gray-700">Cada mañana, antes de revisar el celular, visualiza tu día generando valor y recibiendo abundancia.</p>
        </div>
        <div class="bg-white rounded-lg p-4 shadow">
          <h3 class="font-semibold text-cyan-700 mb-2">✨ Afirmación diaria:</h3>
          <p class="text-sm text-gray-700 italic">"El dinero fluye hacia mí porque actúo con valor y dirección. Hoy identifico y aprovecho nuevas oportunidades."</p>
        </div>
      </div>

      <div class="bg-green-50 border-l-4 border-green-400 p-4">
        <h3 class="font-semibold text-green-800 mb-2">🎯 Consejo práctico:</h3>
        <p class="text-green-700">
          Dedica 3 minutos diarios a visualizar una meta financiera clara y repite tu afirmación en voz alta.
        </p>
      </div>
    </div>

    <!-- 5. Herramientas Prácticas -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Herramientas prácticas para abundancia inmediata</h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="bg-blue-50 rounded-lg p-4">
          <h3 class="font-semibold text-blue-800 mb-2">📊 Tracker Financiero</h3>
          <p class="text-sm text-blue-700">Usa un tracker de ingresos/gastos en Notion o Google Sheets.</p>
        </div>
        <div class="bg-green-50 rounded-lg p-4">
          <h3 class="font-semibold text-green-800 mb-2">🙏 Gratitud Financiera</h3>
          <p class="text-sm text-green-700">Practica gratitud financiera: agradece cada ingreso y cada pago.</p>
        </div>
        <div class="bg-purple-50 rounded-lg p-4">
          <h3 class="font-semibold text-purple-800 mb-2">💰 Dinero en Movimiento</h3>
          <p class="text-sm text-purple-700">Implementa el método "Dinero en Movimiento": separa un % de cada ingreso para reinvertir en crecimiento.</p>
        </div>
      </div>
    </div>

    <!-- 6. Caso de Éxito -->
    <div class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Caso de éxito: Del autosabotaje a la facturación exponencial</h2>
      <div class="bg-white rounded-lg p-6 shadow">
        <p class="text-gray-700 mb-4">
          Laura, emprendedora digital, pasó de tener miedo a vender y rechazar oportunidades, a facturar 5x más en 6 meses.
        </p>
        <h3 class="font-semibold text-emerald-800 mb-2">¿Cómo?</h3>
        <ol class="list-decimal list-inside space-y-2 text-gray-700">
          <li>Detectó y desafió sus creencias limitantes.</li>
          <li>Implementó acciones diarias aunque sentía miedo.</li>
          <li>Buscó alianzas y networking de alto valor.</li>
        </ol>
      </div>
    </div>

    <!-- 7. Ritual Diario -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Ritual diario para activar la abundancia</h2>
      <div class="space-y-3">
        <div class="flex items-start space-x-3">
          <div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</div>
          <p class="text-gray-700">Repite tu afirmación en voz alta al despertar</p>
        </div>
        <div class="flex items-start space-x-3">
          <div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</div>
          <p class="text-gray-700">Visualiza tu meta financiera diaria durante 3 minutos</p>
        </div>
        <div class="flex items-start space-x-3">
          <div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</div>
          <p class="text-gray-700">Haz una acción directa relacionada con dinero antes del mediodía</p>
        </div>
        <div class="flex items-start space-x-3">
          <div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">4</div>
          <p class="text-gray-700">Agradece cada ingreso y cada oportunidad, por pequeña que sea</p>
        </div>
        <div class="flex items-start space-x-3">
          <div class="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">5</div>
          <p class="text-gray-700">Escribe en tu tracker tu avance (ingresos, oportunidades, nuevas conexiones)</p>
        </div>
      </div>
    </div>

    <!-- 8. Reflexión -->
    <div class="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6">
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Reflexión y compromiso personal</h2>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          ¿Cuál es la creencia financiera que vas a transformar hoy?
        </label>
        <textarea
          v-model="reflection"
          @input="saveToLocalStorage('financial_reflection', reflection)"
          placeholder="Ejemplo: 'El dinero es difícil de ganar' ahora es 'El dinero fluye hacia mí cuando actúo con valentía'"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          rows="3"
        ></textarea>
      </div>
    </div>

    <!-- 9. CTA -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
      <h2 class="text-3xl font-bold mb-4">¿Listo para desbloquear tu abundancia y multiplicar tus ingresos?</h2>
      <p class="text-xl mb-6 opacity-90">
        Agenda tu <strong>Llamada de Desbloqueo 1-1 con el equipo de Memo</strong> y recibe estrategias personalizadas para activar tu abundancia hoy.
      </p>
      <a 
          href="#" 
          @click.prevent="openBookingPopup" 
          class="btn-primary bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 inline-flex items-center gap-2"
      >
          Agendar Llamada 1-1
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useBookingModal } from '~/composables/useBookingModal'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Reactive data
const beliefs = ref({
  old: '',
  new: ''
})

const reflection = ref('')

// Chart data for mentalidad financiera
const chartData = {
  labels: ['Preocupaciones que no suceden', 'Empresarios que trabajan mentalidad', 'Personas que actúan inmediatamente'],
  datasets: [
    {
      label: 'Porcentaje',
      data: [92, 85, 15],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(147, 51, 234, 0.8)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(34, 197, 94, 1)',
        'rgba(147, 51, 234, 1)'
      ],
      borderWidth: 1
    }
  ]
}

const chartOptions = {
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

// Chart data for velocidad de acción
const actionChartData = {
  labels: ['Actúan en 48h', 'Postergan'],
  datasets: [
    {
      label: 'Facturación Relativa',
      data: [4, 1],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)'
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)'
      ],
      borderWidth: 1
    }
  ]
}

const actionChartOptions = {
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
      ticks: {
        callback: function(value: number) {
          return value + 'x'
        }
      }
    }
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
  beliefs.value.old = loadFromLocalStorage('financial_old_belief')
  beliefs.value.new = loadFromLocalStorage('financial_new_belief')
  reflection.value = loadFromLocalStorage('financial_reflection')
})

const { open: openBookingPopup } = useBookingModal()
</script> 