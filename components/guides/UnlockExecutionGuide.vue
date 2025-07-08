<template>
  <div class="max-w-3xl mx-auto py-8 space-y-8">
    <!-- Title -->
    <div class="text-center">
      <h1 class="text-3xl md:text-4xl font-bold text-primary-700 mb-2">Desbloquea tu Ejecución – Por Qué el Mindset No es Suficiente</h1>
      <div class="h-1 w-16 bg-primary-500 mx-auto rounded mb-4"></div>
    </div>

    <!-- Introducción -->
    <div class="card bg-blue-50 border-blue-200">
      <h2 class="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
        <LightBulbIcon class="w-6 h-6 text-blue-400" /> Introducción
      </h2>
      <p class="text-gray-700 mb-2">Muchos creen que el secreto está en "pensar positivo" o en visualizar el éxito. La realidad es otra: el mindset te pone en movimiento, pero no garantiza que llegues a la meta. Aquí no vas a encontrar frases bonitas ni hacks vacíos. Vas a descubrir el sistema que separa a los que ejecutan de los que solo sueñan.</p>
    </div>

    <!-- Índice -->
    <div class="card bg-white border-gray-200">
      <h2 class="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <ListBulletIcon class="w-6 h-6 text-primary-400" /> Índice
      </h2>
      <ol class="list-decimal list-inside text-gray-700 space-y-1">
        <li>La trampa del mindset: por qué no basta con querer</li>
        <li>Ejemplo real: el "gurú" que motiva pero no avanza</li>
        <li>El Framework de la Ejecución Imparable (Memo Serrano)
          <ul class="list-disc ml-6 text-gray-600">
            <li>Nivel 1: Emocional</li>
            <li>Nivel 2: Mental</li>
            <li>Nivel 3: Ambiental</li>
            <li>Nivel 4: Conductual</li>
          </ul>
        </li>
        <li>Micro-acciones para reprogramar tu día</li>
        <li>Caso de éxito: De la parálisis a la acción</li>
        <li>Herramientas concretas para convertir intención en resultados</li>
        <li>Ritual diario de ejecución</li>
        <li>Reflexión y compromiso</li>
        <li>Llamado a la acción: agenda tu llamada</li>
      </ol>
    </div>

    <!-- 1. La trampa del mindset -->
    <div class="card bg-red-50 border-red-200">
      <h2 class="text-xl font-bold text-red-700 mb-2 flex items-center gap-2">
        <ExclamationTriangleIcon class="w-6 h-6 text-red-400" /> 1. La trampa del mindset: por qué no basta con querer
      </h2>
      <p class="text-gray-700 mb-2">El "solo cambia tu mente y tu vida cambiará" es la mentira más cara que puedes comprar. La evidencia es clara: Miles de personas con el mindset correcto no ejecutan, y terminan frustradas.</p>
      <div class="font-semibold text-red-800">¿Por qué?</div>
      <p class="text-gray-700">Porque el entorno, las emociones, los hábitos y los sistemas internos siempre vencen a la motivación cuando se acaba la energía.</p>
    </div>

    <!-- 2. Ejemplo real -->
    <div class="card bg-yellow-50 border-yellow-200">
      <h2 class="text-xl font-bold text-yellow-700 mb-2 flex items-center gap-2">
        <UserIcon class="w-6 h-6 text-yellow-400" /> 2. Ejemplo real: el "gurú" que motiva pero no avanza
      </h2>
      <p class="text-gray-700 mb-2">Pedro era conocido por su energía y su mentalidad positiva. Hablaba de abundancia, visualización y ley de atracción, pero en sus proyectos nada se movía. El problema no era falta de ganas: era falta de estructura, foco y sistemas.</p>
      <div class="font-semibold text-yellow-800">Lección:</div>
      <p class="text-gray-700">Sin acción sistemática, la motivación se vuelve ansiedad.</p>
    </div>

    <!-- 3. Framework de la Ejecución Imparable -->
    <div class="card bg-primary-50 border-primary-200">
      <h2 class="text-xl font-bold text-primary-700 mb-4 flex items-center gap-2">
        <Cog6ToothIcon class="w-6 h-6 text-primary-400" /> 3. El Framework de la Ejecución Imparable (Memo Serrano)
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Nivel 1: Emocional -->
        <div class="bg-rose-50 border-l-4 border-rose-400 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <FaceSmileIcon class="w-5 h-5 text-rose-400" />
            <span class="font-bold text-rose-700">Nivel 1: Emocional</span>
          </div>
          <ul class="list-disc ml-6 text-gray-700 space-y-1">
            <li>Identifica y regula tus emociones antes de ejecutar.</li>
            <li>El miedo, la ansiedad y la autoexigencia extrema sabotean tu avance.</li>
            <li class="flex items-center gap-2"><span class="font-semibold text-rose-600">Tip:</span> Usa respiración cuadrada (inhala 4, retén 4, exhala 4, retén 4).</li>
          </ul>
        </div>
        <!-- Nivel 2: Mental -->
        <div class="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <BoltIcon class="w-5 h-5 text-blue-400" />
            <span class="font-bold text-blue-700">Nivel 2: Mental</span>
          </div>
          <ul class="list-disc ml-6 text-gray-700 space-y-1">
            <li>Reprograma tus pensamientos limitantes.</li>
            <li>Frases como "no soy suficiente" o "no es el momento" solo existen en tu cabeza.</li>
            <li class="flex items-center gap-2"><span class="font-semibold text-blue-600">Tip:</span> Journaling de creencias: cada mañana, escribe y desafía tu principal pensamiento limitante.</li>
          </ul>
        </div>
        <!-- Nivel 3: Ambiental -->
        <div class="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <HomeModernIcon class="w-5 h-5 text-green-400" />
            <span class="font-bold text-green-700">Nivel 3: Ambiental</span>
          </div>
          <ul class="list-disc ml-6 text-gray-700 space-y-1">
            <li>Elimina los estímulos que te distraen y organiza tu espacio.</li>
            <li>Un entorno desordenado multiplica la procrastinación.</li>
            <li class="flex items-center gap-2"><span class="font-semibold text-green-600">Tip:</span> Deja fuera del alcance el móvil y desactiva notificaciones en tus bloques de trabajo.</li>
          </ul>
        </div>
        <!-- Nivel 4: Conductual -->
        <div class="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <PlayIcon class="w-5 h-5 text-purple-400" />
            <span class="font-bold text-purple-700">Nivel 4: Conductual</span>
          </div>
          <ul class="list-disc ml-6 text-gray-700 space-y-1">
            <li>Acción antes que perfección.</li>
            <li>No planees más de la cuenta. El secreto es empezar y ajustar en el camino.</li>
            <li class="flex items-center gap-2"><span class="font-semibold text-purple-600">Tip:</span> Aplica la regla de los 2 minutos: si puedes hacer algo en menos de 2 minutos, hazlo ya.</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 4. Micro-acciones para reprogramar tu día -->
    <div class="card bg-emerald-50 border-emerald-200">
      <h2 class="text-xl font-bold text-emerald-700 mb-2 flex items-center gap-2">
        <CheckCircleIcon class="w-6 h-6 text-emerald-400" /> 4. Micro-acciones para reprogramar tu día
      </h2>
      <ul class="list-disc ml-6 text-gray-700 space-y-1">
        <li><span class="inline-flex items-center gap-1"><CheckCircleIcon class="w-5 h-5 text-emerald-500" /> Define tu <span class="font-semibold">MIT</span> (Tarea Más Importante) cada mañana.</span></li>
        <li><span class="inline-flex items-center gap-1"><CheckCircleIcon class="w-5 h-5 text-emerald-500" /> Bloquea 2 sesiones de 50 minutos de Deep Work al día.</span></li>
        <li><span class="inline-flex items-center gap-1"><CheckCircleIcon class="w-5 h-5 text-emerald-500" /> Antes de ejecutar, haz 3 respiraciones profundas y repite tu objetivo.</span></li>
        <li><span class="inline-flex items-center gap-1"><CheckCircleIcon class="w-5 h-5 text-emerald-500" /> Cierra cada día con una revisión: ¿qué sí ejecuté?, ¿qué puedo mejorar mañana?</span></li>
      </ul>
    </div>

    <!-- 5. Caso de éxito -->
    <div class="card bg-orange-50 border-orange-200">
      <h2 class="text-xl font-bold text-orange-700 mb-2 flex items-center gap-2">
        <StarIcon class="w-6 h-6 text-orange-400" /> 5. Caso de éxito: De la parálisis a la acción
      </h2>
      <p class="text-gray-700 mb-2">Ana, consultora, pasaba semanas analizando qué estrategia seguir. Solo avanzó cuando implementó bloques de ejecución sin excusas y revisó su progreso diario. El resultado: duplicó sus clientes en 3 meses.</p>
    </div>

    <!-- 6. Herramientas concretas -->
    <div class="card bg-cyan-50 border-cyan-200">
      <h2 class="text-xl font-bold text-cyan-700 mb-2 flex items-center gap-2">
        <WrenchScrewdriverIcon class="w-6 h-6 text-cyan-400" /> 6. Herramientas concretas para convertir intención en resultados
      </h2>
      <ul class="list-disc ml-6 text-gray-700 space-y-1">
        <li><span class="inline-flex items-center gap-1"><CheckIcon class="w-5 h-5 text-cyan-500" /> Notion o Trello para tu dashboard de seguimiento.</span></li>
        <li><span class="inline-flex items-center gap-1"><CheckIcon class="w-5 h-5 text-cyan-500" /> Técnica Pomodoro para concentración (50/10 min x 4 ciclos).</span></li>
        <li><span class="inline-flex items-center gap-1"><CheckIcon class="w-5 h-5 text-cyan-500" /> App de bloqueo de redes (Forest, FocusMe).</span></li>
        <li><span class="inline-flex items-center gap-1"><CheckIcon class="w-5 h-5 text-cyan-500" /> Checklist diaria y semanal de avances.</span></li>
      </ul>
    </div>

    <!-- 7. Ritual diario de ejecución -->
    <div class="card bg-purple-50 border-purple-200">
      <h2 class="text-xl font-bold text-purple-700 mb-2 flex items-center gap-2">
        <CalendarDaysIcon class="w-6 h-6 text-purple-400" /> 7. Ritual diario de ejecución
      </h2>
      <ol class="list-decimal ml-6 text-gray-700 space-y-1">
        <li>Revisar MIT y bloque de tiempo para ejecutarlo</li>
        <li>Respiración cuadrada antes de iniciar</li>
        <li>Móvil en modo avión, notificaciones fuera</li>
        <li>Deep Work sin interrupciones</li>
        <li>Revisión y cierre: escribir 1 microaprendizaje del día</li>
      </ol>
    </div>

    <!-- 8. Reflexión y compromiso (interactive) -->
    <div class="card bg-primary-50 border-primary-200">
      <h2 class="text-xl font-bold text-primary-700 mb-2 flex items-center gap-2">
        <PencilIcon class="w-6 h-6 text-primary-400" /> 8. Reflexión y compromiso
      </h2>
      <p class="text-gray-700 mb-2">¿Cuál es la micro-acción que vas a tomar hoy para desbloquear tu ejecución?</p>
      <textarea
        v-model="reflection"
        @input="saveReflection"
        rows="3"
        class="w-full rounded border border-primary-200 p-3 focus:ring-2 focus:ring-primary-400 resize-none"
        placeholder="Escribe aquí tu micro-acción y guarda el compromiso."
      ></textarea>
      <div v-if="reflectionSaved" class="text-green-600 text-sm mt-1">¡Guardado!</div>
      <div class="text-xs text-gray-500 mt-2">(El contenido se guarda en localStorage para seguimiento y recordatorio.)</div>
    </div>

    <!-- 9. Llamado a la acción -->
    <div class="bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl p-8 text-center text-white">
      <h2 class="text-2xl font-bold mb-4">¿Listo para dejar de justificar y empezar a ejecutar en serio?</h2>
      <p class="text-lg mb-6 opacity-90">Agenda tu <span class="font-bold">Llamada de Desbloqueo 1-1 con el equipo de Memo</span> y recibe ayuda directa para sistematizar tu ejecución y lograr resultados medibles, no solo intenciones.</p>
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
import {
  LightBulbIcon, ListBulletIcon, ExclamationTriangleIcon, UserIcon, Cog6ToothIcon, FaceSmileIcon, BoltIcon, HomeModernIcon, PlayIcon, CheckCircleIcon, StarIcon, WrenchScrewdriverIcon, CheckIcon, CalendarDaysIcon, PencilIcon
} from '@heroicons/vue/24/outline'
import { useBookingModal } from '~/composables/useBookingModal'

const REFLECTION_KEY = 'unlockExecutionReflection'
const reflection = ref('')
const reflectionSaved = ref(false)

function saveReflection() {
  localStorage.setItem(REFLECTION_KEY, reflection.value)
  reflectionSaved.value = true
  setTimeout(() => { reflectionSaved.value = false }, 1200)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(REFLECTION_KEY)
    if (saved) reflection.value = saved
  }
})
</script>

<style scoped>
.card {
  @apply rounded-xl shadow-lg border p-6 mb-4;
}
</style> 