import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Detect user's country on plugin initialization
  let detectedCountry = 'us' // default fallback
  
  // Use a reliable geolocation API
  const detectCountry = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      if (data.country_code) {
        detectedCountry = data.country_code.toLowerCase()
        console.log('🌍 Country detected:', detectedCountry)
      }
    } catch (error) {
      console.log('🌍 Country detection failed, using default:', detectedCountry)
    }
  }
  
  // Run detection immediately
  detectCountry()
  
  nuxtApp.vueApp.use(VueTelInput, {
    mode: 'international',
    defaultCountry: detectedCountry, // Use detected country or fallback to 'us'
    inputOptions: {
      placeholder: 'Ingresa tu número de teléfono',
      showDialCode: true,
    },
    autoFormat: true,
    preferredCountries: ['mx', 'us', 'es', 'ar', 'co', 'pe', 'cl', 'br'],
    validCharactersOnly: true,
    inputClasses: 'w-full rounded-2xl p-3 text-base border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200',
    dropdownOptions: {
      showDialCodeInSelection: true,
      showFlags: true,
      showSearchBox: true,
      searchBoxPlaceholder: 'Buscar país...',
    },
  })
}) 