<template>
    <div class="header">
        <div class="logo">
          <router-link to="/"><img src="@/assets/img/Fintastical-logo-nav-DESKTOP.svg " alt="Fintastical Logo" class="logo" /></router-link>
        </div>
      </div>
    <div>
      <router-view />
    </div>

</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>
<style scoped>
.logo {
  width: 100%;
  min-width: 30rem;
  max-width: 50rem;
}
.header {
display: flex;
justify-content: center;
}
</style>
