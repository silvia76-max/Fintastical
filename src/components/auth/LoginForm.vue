<template>
  <form class="login-form">
    <h2>Formulario de Login</h2>
    <input type="email" placeholder="Correo electrónico" />
    <input type="password" placeholder="Contraseña" />
    <button type="submit">Entrar</button>
  </form>
</template>

<script>
export default {
  name: 'LoginForm'
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 0 auto;
}
</style>
