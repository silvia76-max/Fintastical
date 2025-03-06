<template>
  <footer class="footer-layout">
    <nav>
      <ul>
        <li><router-link to="/cookie-policy">Política de Cookies</router-link></li>
        <li><router-link to="/privacy-policy">Política de Privacidad</router-link></li>
        <li><router-link to="/regulation-license">Regulación y Licencia</router-link></li>
        <li><router-link to="/terms-conditions">Términos y Condiciones</router-link></li>
        <li><router-link to="/general-risk-disclosure">Divulgación de Riesgos</router-link></li>
        <li><router-link to="/key-information-documents">Documentos Clave</router-link></li>
      </ul>
    </nav>
    <p>&copy; 2025 Mi Plataforma de Inversiones. Todos los derechos reservados.</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterLayout',
}
</script>

<style scoped>
.footer-layout {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 15px 20px;
}
</style>
