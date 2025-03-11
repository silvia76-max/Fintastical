<template>
  <header class="header-layout">
    <div class="logo"><router-link to="/"><img src="@/assets/img/Fintastical-logo-nav-DESKTOP.svg " alt="Fintastical Logo" class="logo" /></router-link></div>
    <nav>
      <ul>
        <li v-if="isAuthenticated"><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/blog">Noticias</router-link></li>
        <li><router-link to="/contact">Contacto</router-link></li>
        <li><router-link to="/auth/register">Sign up</router-link></li>
        <li><router-link to="/auth/login" class="login">Login</router-link></li>

        <li v-if="isAuthenticated"><router-link to="/auth/profile">Perfil</router-link></li>
        <li v-if="isAuthenticated"><a href="#" @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { computed } from "vue";

const auth = useAuthStore()
const router = useRouter()

const isAuthenticated = computed(() => auth.isAuthenticated)

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.header-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background) ;
  color: var(--purple-light);
  padding: 10px 20px;
}

.logo {
width: 40%;
min-width: 266px;
max-width: 500px;
}

.login {
  background-color: var(--purple);
  color: var(--purple-light);
  padding: 0.5rem 1.2rem;
  border-radius: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

nav ul li a {
  color: var(--purple-dark);
  text-decoration: none;
  font-size: 1.3rem;
}

</style>
