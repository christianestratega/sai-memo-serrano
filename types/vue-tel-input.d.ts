declare module 'vue-tel-input' {
  import { DefineComponent } from 'vue'
  
  interface VueTelInputOptions {
    mode?: 'international' | 'national'
    autoDefaultCountry?: boolean
    defaultCountry?: string
    inputOptions?: {
      placeholder?: string
      showDialCode?: boolean
    }
    autoFormat?: boolean
    preferredCountries?: string[]
    validCharactersOnly?: boolean
    inputClasses?: string
    dropdownOptions?: {
      showDialCodeInSelection?: boolean
      showFlags?: boolean
      showSearchBox?: boolean
      searchBoxPlaceholder?: string
    }
  }

  interface VueTelInputInstance {
    install: (app: any, options?: VueTelInputOptions) => void
  }

  const VueTelInput: VueTelInputInstance
  export default VueTelInput
} 