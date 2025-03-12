<template>
  <div class="login-view">
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
