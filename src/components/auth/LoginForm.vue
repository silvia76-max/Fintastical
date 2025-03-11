<template>
  <!-- Preloader -->
  <div v-if="loading">
    <Loader />
  </div>
  <div class="login-container">
    <div class="login-card">
      <img src="@/assets/img/Fintastical-logo-nav-DESKTOP.svg" alt="Fintastical Logo" class="logo" />
      <h1>Welcome!</h1>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" class="input-field">
        <input type="password" v-model="password" placeholder="Contraseña" class="input-field">
        <button type="submit" class="login-button">Entrar</button>
      </form>
      <p v-if="error" class="error">Incorrect credentials!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Loader from '@/components/LoaderComp.vue';

const email = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  if (await auth.login(email.value, password.value)) {
    router.push('/dashboard')
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: var(--background);
  padding: 20px;
}

.login-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  max-width: 400px;
  width: 100%;
  margin-top: 50px;
  text-align: center;
}

.logo {
  width: 100%;
  margin-bottom: 20px;
}

h1 {
  color: var(--purple);
  font-size: 3rem;
  margin-bottom: 20px;
}

.input-field {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: 1px solid var(--purple-gray);
  border-radius: 5px;
  font-size: 1.6rem;
}

.login-button {
  display: block;
  padding: 10px 20px;
  margin: 20px auto;
  background-color: var(--purple);
  color: var(--purple-light);
  border: none;
  border-radius: 5px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.login-button:hover {
  background-color: var(--purple-hover);
}

.error {
  color: var(--red);
  margin-top: 10px;
  font-size: 1.4rem;
}
</style>
