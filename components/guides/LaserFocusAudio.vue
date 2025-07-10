<template>
  <div class="max-w-2xl mx-auto p-6 space-y-8">
    <!-- Callout: Por qué funciona + Memo advice -->
    <div class="bg-blue-50 border-l-4 border-blue-400 rounded-xl p-6 flex flex-col gap-4">
      <h1 class="text-2xl md:text-3xl font-bold text-blue-800">Audio de Activación Adicional: Enfoque Láser Para Modo Ejecución</h1>
      <div class="text-gray-700 space-y-2">
        <ul class="list-disc pl-5 space-y-1">
          <li>Este audio ha sido diseñado con técnicas de meditación activa y neuroacústica para maximizar tu enfoque y entrar rápidamente en estado de flow productivo.</li>
          <li>Incorpora frecuencias y una guía breve que ayudan a tu cerebro a dejar de lado distracciones y activar la ejecución enfocada, incluso en días difíciles.</li>
        </ul>
        <div class="bg-blue-100 border-l-4 border-blue-400 rounded p-4 mt-2">
          <span class="block text-blue-700 font-semibold mb-1">Memo dice:</span>
          <blockquote class="italic text-blue-800">“No puedes esperar a sentirte con ganas. Usa este audio como tu ancla diaria para condicionar tu mente a accionar, no a posponer.”</blockquote>
        </div>
      </div>
    </div>

    <!-- ¿Cómo usarlo? -->
    <div class="bg-white rounded-xl shadow p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-3">¿Cómo usarlo?</h2>
      <ol class="list-decimal pl-6 space-y-2 text-gray-700">
        <li><strong>Encuentra un espacio tranquilo</strong> antes de una sesión de trabajo importante.</li>
        <li><strong>Pon el audio con audífonos</strong> para aislarte de ruido externo.</li>
        <li><strong>Cierra los ojos y respira profundo</strong> los primeros 30 segundos.</li>
        <li><strong>Sigue la guía del audio</strong>: te llevará a visualizar tu objetivo y entrar en modo ejecución.</li>
        <li>Cuando termine, abre tu lista de prioridades y ejecuta la más importante de inmediato.</li>
      </ol>
    </div>

    <!-- Recomendación -->
    <div class="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-6">
      <h2 class="text-xl font-bold text-yellow-800 mb-2">Recomendación</h2>
      <ul class="list-disc pl-5 space-y-1 text-gray-800">
        <li>Úsalo cada mañana o antes de cualquier bloque de trabajo profundo.</li>
        <li>Repítelo hasta que sientas que puedes activar tu modo ejecución solo con recordar la sensación.</li>
      </ul>
    </div>

    <!-- Audio Player (Coming Soon) -->
    <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
      <h2 class="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <svg class="w-6 h-6 text-yellow-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
        ¡Audio disponible muy pronto!
      </h2>
      <p class="text-gray-700 text-center max-w-md">
        Estamos terminando de masterizar el audio de enfoque láser para que tengas la mejor experiencia posible.<br>
        <span class="font-semibold text-blue-700">¿Quieres ser el primero en escucharlo?</span>
      </p>
      <input
        v-model="email"
        type="email"
        placeholder="Tu correo para avisarte..."
        class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
      />
      <button
        @click="notifyMe"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors"
      >
        ¡Avísame cuando esté listo!
      </button>
      <div v-if="notified" class="text-green-600 mt-2">¡Te avisaremos en cuanto esté disponible! 🚀</div>
      <div class="text-xs text-gray-400 mt-2">(No hacemos spam. Solo una notificación para el lanzamiento.)</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{ user?: { name?: string, mainActivity?: string } }>()
const isDevMode = computed(() => {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
})
const user = props.user
const email = ref('')
const notified = ref(false)
function notifyMe() {
  if (email.value && email.value.includes('@')) {
    notified.value = true
    setTimeout(() => { notified.value = false }, 3000)
    email.value = ''
  }
}
</script> 