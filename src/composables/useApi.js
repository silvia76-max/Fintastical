import { ref } from 'vue'
import axios from 'axios'

export function useApi() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (url) => {
    loading.value = true
    try {
      const response = await axios.get(url)
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
      const response = await axios.post(url, payload)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const putData = async (url, payload) => {
    loading.value = true
    try {
      const response = await axios.put(url, payload)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteData = async (url) => {
    loading.value = true
    try {
      const response = await axios.delete(url)
      data.value = response.data
      return response
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchData, postData, putData, deleteData }
}
