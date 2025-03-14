<template>
   <!-- Preloader -->
   <div v-if="loading">
    <Loader />
  </div>
  <div class="register-container">
    <div class="img-register"></div>

    <div class="register-card">
         <div class="logo-auth">
          <router-link to="/"><img src="@/assets/img/Fintastical-logo-nav-DESKTOP.svg " alt="Fintastical Logo" class="logo-img" /></router-link>
      <h1>Nice to meet you!</h1>
      <p>Sign up with us to continue</p>
        <form class="register-form" @submit.prevent="handleRegister">
          <input class="input-field" type="name" v-model="name" placeholder="Nombre" data-cy="input-name">
          <input class="input-field" type="email" v-model="email" placeholder="Email" data-cy="input-email">
          <input class="input-field" type="password" v-model="password" placeholder="Contraseña" data-cy="input-password">
          <button class="register-button" type="submit" data-cy="submit-btn">Register</button>
          <p v-if="error" class="error" data-cy="error-msg">{{ error }}</p>
        </form>
   </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const name = ref('')
const password = ref('')
const error = ref(null)
const router = useRouter()
const auth = useAuthStore()

const handleRegister = async () => {
  error.value = null
  const success = await auth.register(name.value, email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    error.value = 'Error al registrar el usuario'
  }
}
</script>

<style scoped>
.logo-auth {
  width: 100%;
  min-width: 30rem;
  max-width: 50rem;
  margin-bottom: 5rem;
}

.logo-img {
  width: 100%;
  min-width: 30rem;
  max-width: 50rem;
}

.register-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--background);
  padding: 0;
  margin: 0;
}

.img-register {
  flex: 1;
  min-width: 300px;
  background-color: var(--purple-hover);
  background: url("@/assets/img/register-unicorn.jpeg") center/cover no-repeat;
}


.register-card {
  flex: 1;
  min-width: 300px;
  background-color: var(--background);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
}

.register-form {
  margin: 8rem 0;
}

.input-field {
  margin: 10px 0;
  padding: 1rem 1.5rem;
  width: 100%;
  border: 1px solid var(--purple);
  border-radius: 4rem;
  font-size: 1.3rem;
}

.register-button {
  display: block;
  padding: 1rem 2rem;
  margin: 8rem auto;
  background-color: var(--purple);
  color: var(--purple-light);
  border: none;
  border-radius: 5rem;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.register-button:hover {
  background-color: var(--purple-hover);
}


.error {
  color: red;
  margin-top: 10px;
}

@media (max-width: 1024px) {
  .register-container {
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  padding: 0;
  margin: 0;
}
.img-register {
  display: none;
}

}
</style>
