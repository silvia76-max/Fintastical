<template>
  <div class="login-view">
    <h1>Vista de Login</h1>
    <!-- Se utiliza el componente de login reutilizable -->
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '@/components/auth/LoginForm.vue'

export default {
  name: 'LoginView',
  components: { LoginForm },
}
</script>

<style scoped>
.login-view {
  padding: 20px;
  text-align: center;
}
</style>
