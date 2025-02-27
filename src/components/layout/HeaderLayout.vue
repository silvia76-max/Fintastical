<template>
  <header class="header-layout">
    <div class="logo">MiPlataforma</div>
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/investments">Inversiones</router-link></li>
      <li><router-link to="/charts">Gráficos</router-link></li>
      <li><router-link to="/alerts">Alertas</router-link></li>
      <li><router-link to="/blog">Blog</router-link></li>
      <li><router-link to="/profile">Perfil</router-link></li>
      <li><router-link to="/auth/login">Login</router-link></li>
      <li><router-link to="/auth/register">Registro</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: 'HeaderLayout',
}
</script>

<style scoped>
.header-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
}
.logo {
  font-size: 1.5em;
  font-weight: bold;
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
