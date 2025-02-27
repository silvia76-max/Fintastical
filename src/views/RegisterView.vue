<template>
  <div class="register-view">
    <h1>Vista de Registro</h1>
    <!-- Se utiliza el componente de registro reutilizable -->
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue';

export default {
  name: 'RegisterView',
  components: { RegisterForm }
};
</script>

<style scoped>
.register-view {
  padding: 20px;
  text-align: center;
}
</style>
