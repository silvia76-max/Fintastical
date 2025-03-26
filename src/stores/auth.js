import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const error = ref(null)
  const loading = ref(false)

  // Cargar usuario desde localStorage al iniciar
  const loadUser = () => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
      } catch (e) {
        console.error('Error parsing user data:', e)
        logout()
      }
    }
  }

  // Inicializar cargando el usuario
  loadUser()

  // Función de login
  async function login(email, password) {
    loading.value = true
    error.value = null

    try {
      const { postData } = useApi()
      const response = await postData('/auth/login', { email, password })

      if (response.token) {
        user.value = response.user
        isAuthenticated.value = true
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('token', response.token)
        return true
      }

      error.value = 'Credenciales inválidas'
      return false
    } catch (err) {
      error.value = err.message || 'Error en el login'
      return false
    } finally {
      loading.value = false
    }
  }

  // Función de registro
  async function register(userData) {
    loading.value = true
    try {
      const { postData } = useApi()
      const response = await postData('/auth/register', userData)

      if (response.token) {
        user.value = response.user
        isAuthenticated.value = true
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('token', response.token)
        return true
      }

      return false
    } catch (err) {
      error.value = err.message || 'Error en el registro'
      return false
    } finally {
      loading.value = false
    }
  }

  // Función de logout
  function logout() {
    user.value = null
    isAuthenticated.value = false
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return {
    user,
    isAuthenticated,
    error,
    loading,
    login,
    register,
    logout,
    loadUser
  }
})
