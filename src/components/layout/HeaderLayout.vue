<template>
  <header class="header-layout">
    <div class="logo"><router-link to="/"><img src="@/assets/img/Fintastical-logo-nav-DESKTOP.svg " alt="Fintastical Logo" class="logo" /></router-link></div>
    <nav>
      <ul>
        <li v-if="isAuthenticated"><router-link to="/dashboard" class="router-link">Dashboard</router-link></li>
        <li><router-link to="/blog" class="router-link">Financial News</router-link></li>
        <li><router-link to="/contact" class="router-link">Contact Us</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/auth/register" class="router-link">Sign up</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/auth/login" class="login">Login</router-link></li>
        <li v-if="isAuthenticated"><router-link to="/auth/profile" class="loged">{{ user.name }}</router-link></li>
        <li v-if="isAuthenticated"><a href="#" @click.prevent="logout" class="logout">Logout</a></li>
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
const user = computed(() => auth.user)

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.header-layout {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background) ;
  color: var(--purple-light);
  padding: 10px 20px;
  box-shadow: 0px 0px 50px #6046b0;
}

.logo {
width: 40%;
min-width: 266px;
max-width: 500px;
}

.signup {
  color: var(--green);
  padding: 1rem 2rem;
}

.login {

  background-color: var(--purple-light);
  color: var(--purple-dark);
  padding: 1rem 2rem;
  border-radius: 1rem;
}

.login:hover {
  background-color: var(--purple);
  color: var(--purple-light);
}

.loged {
  background-color: var(--purple);
  color: var(--purple-light);
  padding: 1rem 2.1rem 1rem 1.2rem;
  border-radius: 1rem;
}

.loged:hover {
  background-color: var(--purple-light);
  color: var(--purple-dark);
}


.loged::before {
  content: '\f007';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: 0;
  left: 0;
  font-size: 1.6rem;
  color: inherit;
}

.logout {

  background-color: var(--purple-light);
  color: var(--red);
  padding: 1rem 2.1rem 1rem 1.2rem;
  border-radius: 1rem;
  border: 1px solid var(--red);
}

.logout:hover {
  background-color: var(--red);
  color: var(--purple-dark);
  padding: 1rem 2.1rem 1rem 1.2rem;
  border-radius: 1rem;
  border: 1px solid var(--red);
}

.logout::before {
  content: '\f011';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: 0;
  left: 0;
  font-size: 1.6rem;
  color: inherit;
}


nav ul {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}

nav ul li .router-link {
  color: var(--purple-dark);
  text-decoration: none;
  font-size: 1.6rem;
  position: relative;
  overflow: hidden;
  transition: color 0.3s;
  padding: 0.5rem 1rem;
}

nav ul li .router-link::before {
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

.signup.router-link::before{
  background-color: var(--green);
}


nav ul li .router-link:hover::before {
  visibility: visible;
  transform: scaleX(1);
}

nav ul li .router-link:hover {
  color: var(--purple);
}

</style>
