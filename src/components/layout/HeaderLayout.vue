<template>
  <header class="header-layout">
    <div class="logo"><img src="@/assets/img/Fintastical-logo-nav-DESKTOP.svg " alt="Fintastical Logo" class="logo" /></div>
    <nav>
      <ul>
        <li v-if="isAuthenticated"><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/blog">Noticias</router-link></li>
        <li><router-link to="/contact">Contacto</router-link></li>
        <li><router-link to="/auth/login">Login</router-link></li>
        <li><router-link to="/auth/register">Registro</router-link></li>

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
  background-color: var(--purple-light);
  color: #fff;
  padding: 10px 20px;
}
.logo {
width: 40%;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}
nav ul li a {
  color: #fff;
  text-decoration: none;
}
</style>
