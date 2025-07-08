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

    <!-- Audio Player -->
    <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center gap-4">
      <h2 class="text-xl font-bold text-gray-900 mb-2">Audio de Enfoque Láser</h2>
      <audio
        controls
        :src="audioSrc"
        class="w-full max-w-md"
      >
        Tu navegador no soporta el elemento de audio.
      </audio>
      <a
        :href="audioSrc"
        download
        class="mt-2 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition-colors"
      >
        Descargar Audio
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{ user?: { name?: string, mainActivity?: string } }>()
const isDevMode = computed(() => {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
})
const user = props.user
const audioSrc = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
</script> 