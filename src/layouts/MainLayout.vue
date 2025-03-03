<template>
  <div>
    <HeaderLayout />
    <!-- El encabezado -->
    <router-view />
    <!-- Aquí se cargarán las vistas hijas de MainLayout -->
    <FooterLayout />
    <!-- El pie de página -->
  </div>
</template>

<script>
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'

export default {
  name: 'MainLayout',
  components: {
    HeaderLayout,
    FooterLayout,
  },
}
</script>
