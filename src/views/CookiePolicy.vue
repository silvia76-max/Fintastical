<template>
  <div class="policy-container">
    <h1>Cookie Policy - Fintastic</h1>
    <p>At Fintastic, we respect your privacy rights and provide you with tools to manage cookies.</p>

    <!-- Strictly necessary cookies -->
    <section class="cookie-section">
      <h2>Strictly Necessary Cookies</h2>
      <p>These cookies are essential for the website to function properly. They enable basic features like page navigation and access to secure areas.</p>
      <ul class="cookie-list">
        <li>
          <strong>Host:</strong> fintastic.com<br>
          <strong>Cookie Name:</strong> ak.bmsc<br>
          <strong>Description:</strong> Cookie associated with Akamai, used to differentiate between human traffic and bots.<br>
          <strong>Expiration Duration:</strong> 0 Days
        </li>
        <li>
          <strong>Host:</strong> fintastic.com<br>
          <strong>Cookie Name:</strong> OptanonAlertBoxClosed<br>
          <strong>Description:</strong> Cookie set by the OneTrust cookie compliance solution, prevents the alert from being displayed multiple times.<br>
          <strong>Expiration Duration:</strong> 1 Year
        </li>
        <!-- Add more cookies as needed -->
      </ul>
    </section>

    <!-- Performance cookies -->
    <section class="cookie-section">
      <h2>Performance Cookies</h2>
      <p>These cookies help us understand how visitors interact with the website by collecting and reporting information anonymously.</p>
      <ul class="cookie-list">
        <li>
          <strong>Host:</strong> fintastic.com<br>
          <strong>Cookie Name:</strong> hjSession.xxxxxxxx<br>
          <strong>Description:</strong> Cookie that contains the current session data. It is used to attribute subsequent requests to the same session.<br>
          <strong>Expiration Duration:</strong> 0 Days
        </li>
        <li>
          <strong>Host:</strong> fintastic.com<br>
          <strong>Cookie Name:</strong> .ga<br>
          <strong>Description:</strong> Associated with Google Analytics to distinguish unique users. It is used to calculate visitor and session data.<br>
          <strong>Expiration Duration:</strong> 1 Year
        </li>
        <!-- Add more cookies as needed -->
      </ul>
    </section>

    <!-- Functionality cookies -->
    <section class="cookie-section">
      <h2>Functionality Cookies</h2>
      <p>These cookies allow the website to remember choices you make (such as your username or region) and provide enhanced, more personal features.</p>
      <ul class="cookie-list">
        <li>
          <strong>Host:</strong> fintastic.com<br>
          <strong>Cookie Name:</strong> cf.clearance<br>
          <strong>Description:</strong> Cookie used to verify that the user is not a bot. It is used to resolve a security challenge.<br>
          <strong>Expiration Duration:</strong> 1 Year
        </li>
        <!-- Add more cookies as needed -->
      </ul>
    </section>

    <!-- Advertising cookies -->
    <section class="cookie-section">
      <h2>Advertising Cookies</h2>
      <p>These cookies are used to deliver advertisements that are more relevant to you and your interests.</p>
      <ul class="cookie-list">
        <li>
          <strong>Host:</strong> doubleclick.net<br>
          <strong>Cookie Name:</strong> IDE<br>
          <strong>Description:</strong> Cookie used to display personalized ads on Google and other advertising platforms.<br>
          <strong>Expiration Duration:</strong> 1 Year
        </li>
        <li>
          <strong>Host:</strong> taboola.com<br>
          <strong>Cookie Name:</strong> t.pt-gid<br>
          <strong>Description:</strong> Cookie used for attribution purposes to identify the referring website.<br>
          <strong>Expiration Duration:</strong> 1 Year
        </li>
        <!-- Add more cookies as needed -->
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CookiePolicy',
}
</script>

<style scoped>
.policy-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
  color: #222;
}

h2 {
  font-size: 1.5rem;
  margin-top: 30px;
  margin-bottom: 15px;
  color: #444;
}

.cookie-section {
  margin-bottom: 40px;
}

.cookie-section p {
  margin-bottom: 15px;
  color: #555;
}

.cookie-list {
  list-style: none;
  padding: 0;
}

.cookie-list li {
  background-color: #f8f9fa;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cookie-list li strong {
  color: #222;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .policy-container {
    padding: 15px;
  }

  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  .cookie-list li {
    padding: 10px;
  }
}
</style>
