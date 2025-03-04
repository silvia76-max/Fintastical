<template>
  <h1>Perfil del Usuario</h1>
  <div class="profile-view" v-if="isAuthenticated">
    <p>Información y configuración del perfil.</p>

    <div class="profile-data">
      <h1>Hola {{ user.name }}!</h1>
      <p>Tus datos:</p>
      <ul>
        <li>Email: {{ user.email }}</li>
        <li>ID: {{ user.id }}</li>
      </ul>
    </div>

  <h2>Actualizar Perfil</h2>
    <form @submit.prevent="handleUpdateProfile">
      <input type="text" v-model="name" placeholder="Nombre">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Contraseña">
      <button type="submit">Actualizar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>

  <div v-else>
    <p>No estás autenticado. Por favor, inicia sesión.</p>
    <router-link to="/auth/login">Login</router-link>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const user = computed(() => auth.user)
const isAuthenticated = computed(() => auth.isAuthenticated)

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)

watch(user, (newUser) => {
  if (newUser) {
    name.value = newUser.name || ''
    email.value = newUser.email || ''
    password.value = newUser.password || ''
  }
}, { immediate: true })

const handleUpdateProfile = async () => {
  error.value = null
  if (!user.value || !user.value.id) {
    error.value = 'No estás autenticado o falta el ID del usuario'
    return
  }
  const updatedUser = {
    id: user.value.id,
    name: name.value,
    email: email.value,
    password: password.value
  }
  const success = await auth.updateProfile(updatedUser)
  if (!success) {
    error.value = 'Error al actualizar el perfil'
  }
}
</script>

<style scoped>
.profile-view {
  padding: 20px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
