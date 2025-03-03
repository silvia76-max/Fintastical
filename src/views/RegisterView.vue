<template>
  <div>
    <h1>Registro</h1>
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from '@/components/auth/RegisterForm.vue'

export default {
  name: 'RegisterView',
  components: {
    RegisterForm, // Asegurar que está correctamente importado
  },
}
</script>
