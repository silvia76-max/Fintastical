<template>
  <div class="main-layout">
    <HeaderLayout />
    <SidebarLayout />
    <main>
      <router-view />
    </main>
    <FooterLayout />
  </div>
</template>

<script>
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import SidebarLayout from '@/components/layout/SidebarLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'

export default {
  name: 'MainLayout',
  components: { HeaderLayout, SidebarLayout, FooterLayout },
}
</script>

<style scoped>
.main-layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
main {
  padding: 20px;
}
</style>
