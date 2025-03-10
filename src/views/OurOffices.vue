<template>
  <div class="our-offices">
    <h1>Our Offices</h1>
    <p>
      Visit us at one of our offices around the world. We're always happy to meet you in person!
    </p>
    <div class="office-list">
      <div class="office">
        <h3>New York Office</h3>
        <p>123 Financial Street, New York, NY 10001</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
      <div class="office">
        <h3>London Office</h3>
        <p>456 Business Avenue, London, UK EC1A 1BB</p>
        <p>Phone: +44 (0)20 7946 0958</p>
      </div>
      <div class="office">
        <h3>Tokyo Office</h3>
        <p>789 Innovation Road, Tokyo, Japan 100-0001</p>
        <p>Phone: +81 (0)3 1234 5678</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OurOffices'
}
</script>

<style scoped>
.our-offices {
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
  text-align: center;
}

.office-list {
  margin-top: 30px;
}

.office {
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.office h3 {
  color: #2F284C;
  margin-bottom: 10px;
}

.office p {
  font-size: 16px;
  line-height: 1.5;
  color: #555;
  text-align: left;
}
</style>
