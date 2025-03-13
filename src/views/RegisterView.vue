<template>
    <RegisterForm />
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
