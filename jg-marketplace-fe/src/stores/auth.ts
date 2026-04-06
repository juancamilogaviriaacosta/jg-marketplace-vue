import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null
  }),

  actions: {
    async login(username:any, password:any) {
      try {
        const response = await api.post('/api/auth', {
          username,
          password
        })
        if (response?.data?.token && response?.data?.id) {
          this.token = response.data.token
          this.userId = response.data.id
          localStorage.setItem('token', this.token!)
          localStorage.setItem('userId', this.userId!)
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('Login error', error)
        return false
      }
    },

    logout() {
      this.token = null
      localStorage.removeItem('token')
    }
  }
})