import { defineStore } from 'pinia'

interface User {
  id: string
  email: string
  createdAt: string
  updatedAt: string
}

interface Diagnosis {
  id: string
  userId: string
  answers: any
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
    userEmail: (state) => state.user?.email || null
  },

  actions: {
    async login(email: string) {
      this.isLoading = true
      try {
        // Store email in localStorage for persistence
        localStorage.setItem('userEmail', email)
        
        // Find or create user in database
        const { data: userData } = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email }
        })
        
        this.user = userData.user
        this.diagnosis = userData.diagnosis
        
        return { success: true, user: this.user, diagnosis: this.diagnosis }
      } catch (error) {
        console.error('Login error:', error)
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
        const { data: userData } = await $fetch('/api/auth/check', {
          method: 'POST',
          body: { email }
        })
        
        this.user = userData.user
        this.diagnosis = userData.diagnosis
        
        return true
      } catch (error) {
        console.error('Auth check error:', error)
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
          method: 'DELETE',
          body: { userId: this.user.id }
        })
        
        this.diagnosis = null
        return true
      } catch (error) {
        console.error('Delete diagnosis error:', error)
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