<template>

    <HeaderLayout />
    <div>
      <router-view />
    </div>
    <FooterLayout />


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

