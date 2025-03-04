import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '@/composables/useApi.js'

// defineStore crea un "almacén" como cajón de datos global
export const useAuthStore = defineStore('auth', () => {

  const user = ref(null)
  const isAuthenticated = ref(false)

  // Cargar el estado del usuario desde sessionStorage
  const storedUser = sessionStorage.getItem('user')
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser)
      if (parsedUser && parsedUser.id) {
        user.value = parsedUser
        isAuthenticated.value = true
      } else {
        console.error('El usuario almacenado no tiene un ID válido:', parsedUser)
      }
    } catch (error) {
      console.error('Error al parsear el usuario almacenado:', error)
    }
  }

  // Función para login
  async function login(email, password) {
    try {
      const { fetchData } = useApi() // Usamos el composable

      const response = await fetchData(`http://localhost:3000/users?email=${email}`)
      const userData = response.data[0]

      if (userData && userData.password === password) {
        user.value = userData
        isAuthenticated.value = true
        sessionStorage.setItem('user', JSON.stringify(userData))
        return true
      }
      return false
    } catch (error) {
      console.error('Error de login:', error)
      return false
    }
  }

  // Función para registro
  async function register(name, email, password) {
    try {
      const { fetchData, postData } = useApi()
      const response = await fetchData(`http://localhost:3000/users?email=${email}`)
      if (response.data.length > 0) {
        throw new Error('El usuario ya existe')
      }

      const newUser = { name, email, password }
      await postData('http://localhost:3000/users', newUser)
      user.value = newUser
      isAuthenticated.value = true
      sessionStorage.setItem('user', JSON.stringify(newUser))
      return true
    } catch (error) {
      console.error('Error de registro:', error)
      return false
    }
  }

  // Función para actualizar perfil
  async function updateProfile(updatedUser) {
    try {
      const { putData } = useApi()
      const response = await putData(`http://localhost:3000/users/${updatedUser.id}`, updatedUser)
      user.value = response.data
      sessionStorage.setItem('user', JSON.stringify(response.data))
      return true
    } catch (error) {
      console.error('Error al actualizar el perfil:', error)
      return false
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    sessionStorage.removeItem('user')
  }

  // Exponemos lo que queremos que otros usen
  return { user, isAuthenticated, login, register, updateProfile, logout }
})
