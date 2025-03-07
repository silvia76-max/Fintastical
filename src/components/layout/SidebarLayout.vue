<template>
  <aside class="SidebarLayout">
    <ul>
      <li><router-link to="/dashboard">Dashboard</router-link></li>
      <li><router-link to="/investments">Inversiones</router-link></li>
      <li><router-link to="/charts">Gráficos</router-link></li>
      <li><router-link to="/alerts">Alertas</router-link></li>
      <li><router-link to="/profile">Perfil</router-link></li>
      <li><router-link to="/contact">Contacto</router-link></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'SidebarLayout',
}
</script>

<style scoped>
.SidebarLayout {
  background-color: #f5f5f5;
  padding: 15px;
  min-width: 200px;
}
.SidebarLayout ul {
  list-style: none;
  padding: 0;
}
.SidebarLayout ul li {
  margin: 10px 0;
}
.SidebarLayout ul li a {
  color: #333;
  text-decoration: none;
}
</style>
