<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="accessibility">
    <h1>Accessibility</h1>
    <p>
      At Fintastical, we are committed to ensuring that our platform is accessible to everyone, including people with disabilities. Here's how we do it:
    </p>
    <ul>
      <li><strong>Keyboard Navigation:</strong> Our platform can be fully navigated using a keyboard.</li>
      <li><strong>Screen Reader Compatibility:</strong> We ensure compatibility with popular screen readers.</li>
      <li><strong>Alt Text for Images:</strong> All images have descriptive alt text for visually impaired users.</li>
      <li><strong>Contrast and Font Sizes:</strong> We use high-contrast colors and adjustable font sizes for better readability.</li>
    </ul>
    <p>
      If you encounter any accessibility issues, please <router-link to="/contact">contact us</router-link>.
    </p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Accessibility'
}
</script>

<style scoped>
.accessibility {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #2F284C;
  text-align: center;
}

p {
  font-size: 18px;
  line-height: 1.6;
  color: #333;
}

ul {
  margin-top: 20px;
  list-style-type: disc;
  padding-left: 40px;
}

li {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
}

a {
  color: #6046B0;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
