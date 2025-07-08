<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
    <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full relative">
      <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/9bgIp5X6Qd2jIegmUXZD?utm_source=sai&utm_medium=button"
        width="100%"
        height="600"
        frameborder="0"
        allowfullscreen
        class="rounded-b-lg"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookingModal } from '~/composables/useBookingModal'
const { show, close } = useBookingModal()
</script> 