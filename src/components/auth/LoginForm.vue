<template>
  <!-- Preloader -->
  <div v-if="loading">
    <Loader />
  </div>
  <div class="login-container">
    <div class="img-login"></div>
    <div class="login-card">
         <div class="logo-auth">
          <router-link to="/"><img src="@/assets/img/Fintastical-logo-nav-DESKTOP.svg " alt="Fintastical Logo" class="logo-img" /></router-link>
     </div>
      <h1>Welcome!</h1>
      <p>Login in to your account to continue</p>
      <form class="login-form" @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" class="input-field">
        <input type="password" v-model="password" placeholder="Contraseña" class="input-field">
        <button type="submit" class="login-button">Login</button>
        <p v-if="error" class="error">Incorrect credentials!</p>
      </form>
      <p>Don’t have an account on Fintastical? <router-link to="/auth/register" class="router-link"> Sign up</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Loader from '@/components/LoaderComp.vue';
import '@/assets/css/main.css'
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
.logo-auth {
  width: 100%;
  min-width: 30rem;
  max-width: 50rem;
  transform: translateX(-9%);
}

.logo-img{
  width: 100%;
  min-width: 30rem;
  max-width: 50rem;
}

.login-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--background);
  padding: 0;
  margin: 0;
}

.login-card {
  flex: 1;
  min-width: 300px;
  background-color: var(--background);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.img-login {
  flex: 1;
  min-width: 300px;
  background-color: var(--purple-hover);
  background: url("@/assets/img/login-unicorn.jpg") center/cover no-repeat;
}

h1 {
  color: var(--purple);
  font-size: 3rem;
  margin-bottom: 20px;
}

.login-form {
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

.login-button {
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

.login-button:hover {
  background-color: var(--purple-hover);
}

.router-link {
  color: var(--purple);
  text-decoration: none;
  font-size: 1.6rem;
  position: relative;
  overflow: hidden;
  transition: color 0.3s;
  padding: 0.5rem 1rem;
}

.router-link::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--purple-dark);
  visibility: hidden;
  transform: scaleX(0);
  transition: all 0.3s ease-in-out;
}

.router-link:hover::before {
  visibility: visible;
  transform: scaleX(1);
}

.router-link:hover {
  color: var(--purple);
}

.error {
  color: var(--red);

  font-size: 2rem;
  font-weight: bolder;
}

@media (max-width: 1024px) {
  .login-container {
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  padding: 0;
  margin: 0;
}

.login-card {
  flex: 1;
  min-width: 300px;
  background-color: var(--background);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.img-login {
  display: none;
}

.logo-auth {
  width: 100%;
  min-width: 30rem;
  max-width: 50rem;
  transform: translateY(-25%);
}

}
</style>
