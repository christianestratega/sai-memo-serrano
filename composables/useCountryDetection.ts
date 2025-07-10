import { ref, onMounted, readonly } from 'vue'

export const useCountryDetection = () => {
  const detectedCountry = ref('us') // default fallback
  const isDetecting = ref(true)

  const detectCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      if (data.country_code) {
        detectedCountry.value = data.country_code.toLowerCase()
        console.log('🌍 Country detected:', detectedCountry.value)
      }
    } catch (error) {
      console.log('🌍 Country detection failed, using default:', detectedCountry.value)
    } finally {
      isDetecting.value = false
    }
  }

  // Run detection on composable initialization
  onMounted(() => {
    detectCountry()
  })

  return {
    detectedCountry: readonly(detectedCountry),
    isDetecting: readonly(isDetecting),
    detectCountry
  }
} 