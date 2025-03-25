import { ref } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (url) => {
    loading.value = true
    try {
      const response = await axios.get(`${API_BASE_URL}${url}`)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const postData = async (url, payload) => {
    loading.value = true
    try {
      const response = await axios.post(`${API_BASE_URL}${url}`, payload)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // ... (putData y deleteData similares)

  return { data, loading, error, fetchData, postData, putData, deleteData }
}
