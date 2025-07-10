import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  name?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

interface Diagnosis {
  id: string
  userId: string
  answers?: any
  resultKey: string
  createdAt: string
  updatedAt: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    diagnosis: null as Diagnosis | null,
    isLoading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    hasDiagnosis: (state) => !!state.diagnosis,
    userEmail: (state) => state.user?.email || null,
    userDisplayName: (state) => state.user?.name || state.user?.email || 'Usuario'
  },

  actions: {
    async login(email: string, name?: string) {
      this.isLoading = true
      try {
        // Store email in localStorage for persistence
        localStorage.setItem('userEmail', email)
        
        // Log the request for debugging
        console.log('🔐 FRONTEND LOGIN REQUEST:', { email, name })
        
        // Find or create user in database
        const { data: userData } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, name }
        })
        
        this.user = userData.user as unknown as User
        this.diagnosis = userData.diagnosis as unknown as Diagnosis | null
        
        // Log the response for debugging
        console.log('✅ FRONTEND LOGIN SUCCESS:', { 
          userId: this.user?.id, 
          email: this.user?.email,
          name: this.user?.name,
          hasDiagnosis: !!this.diagnosis 
        })
        
        return { success: true, user: this.user, diagnosis: this.diagnosis }
      } catch (error) {
        console.error('❌ FRONTEND LOGIN ERROR:', error)
        return { success: false, error }
      } finally {
        this.isLoading = false
      }
    },

    async checkAuth() {
      const email = localStorage.getItem('userEmail')
      if (!email) return false
      
      this.isLoading = true
      try {
        // Log the request for debugging
        console.log('🔍 FRONTEND AUTH CHECK REQUEST:', { email })
        
        const { data: userData } = await $fetch('/api/auth/check', {
          method: 'POST',
          body: { email }
        })
        
        this.user = userData.user as unknown as User
        this.diagnosis = userData.diagnosis as unknown as Diagnosis | null
        
        // Log the response for debugging
        console.log('✅ FRONTEND AUTH CHECK SUCCESS:', { 
          userId: this.user?.id, 
          email: this.user?.email,
          name: this.user?.name,
          hasDiagnosis: !!this.diagnosis 
        })
        
        return true
      } catch (error) {
        console.error('❌ FRONTEND AUTH CHECK ERROR:', error)
        this.logout()
        return false
      } finally {
        this.isLoading = false
      }
    },

    async saveDiagnosis(answers: any, resultKey: string) {
      if (!this.user) throw new Error('User not authenticated')
      
      try {
        const { data: diagnosisData } = await $fetch('/api/diagnosis/save', {
          method: 'POST',
          body: { 
            userId: this.user.id,
            answers,
            resultKey
          }
        })
        
        this.diagnosis = diagnosisData
        return diagnosisData
      } catch (error) {
        console.error('Save diagnosis error:', error)
        throw error
      }
    },

    async deleteDiagnosis() {
      if (!this.user) throw new Error('User not authenticated')
      
      try {
        await $fetch('/api/diagnosis/delete', {
          method: 'POST',
          body: { userId: this.user.id }
        })
        
        this.diagnosis = null
        return true
      } catch (error) {
        console.error('Delete diagnosis error:', error)
        throw error
      }
    },

    async updateUser(updates: { name?: string; email?: string; phone?: string }) {
      if (!this.user) throw new Error('User not authenticated')
      
      try {
        const { data: userData } = await $fetch('/api/user/update', {
          method: 'POST',
          body: { 
            userId: this.user.id,
            ...updates
          }
        })
        
        this.user = userData.user as unknown as User
        return userData.user
      } catch (error) {
        console.error('Update user error:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.diagnosis = null
      localStorage.removeItem('userEmail')
    }
  }
}) 