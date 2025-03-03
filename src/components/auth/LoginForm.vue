<template>
  <div class="login">
    <h1>🔑Iniciar Sesión🔑</h1>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Contraseña">
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error" class="error">Credenciales incorrectas!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  if (await auth.login(email.value, password.value)) {
    console.log(`${email.value} pass: ${password.value}`)
    router.push('/dashboard')
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  max-width: 300px;
}

.login button {
  display: block;
  padding: 10px 20px;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
