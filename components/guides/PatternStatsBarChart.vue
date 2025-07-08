<template>
  <div class="w-full max-w-lg">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from 'chart.js'
import { computed } from 'vue'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Title)

const props = defineProps<{ data: number[], labels: string[] }>()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: 'Frecuencia (%)',
      data: props.data,
      backgroundColor: [
        '#f87171', // red
        '#facc15', // yellow
        '#60a5fa', // blue
        '#a78bfa', // purple
        '#34d399', // emerald
      ],
      borderRadius: 8,
      barPercentage: 0.7,
      categoryPercentage: 0.6,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx: any) => `${ctx.parsed.y} %`,
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: (v: number) => `${v} %`,
        color: '#64748b',
        font: { size: 14 },
      },
      grid: { color: '#e5e7eb' },
    },
    x: {
      ticks: {
        color: '#64748b',
        font: { size: 14 },
      },
      grid: { display: false },
    },
  },
}
</script> 