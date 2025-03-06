<template>
  <footer class="footer-layout">
    <!-- Logo from the public folder -->
    <div class="logo-container">
      <img src="/public/Fintastical-logo-footer.svg" alt="Fintastical Logo" class="logo" />
    </div>

    <!-- Main content in rows -->
    <div class="footer-content">
      <!-- Navigation and links -->
      <nav class="footer-section">
        <h2>Privacy and Regulation</h2>
        <ul>
          <li><router-link to="/cookie-policy">Cookie Policy</router-link></li>
          <li><router-link to="/privacy-policy">Privacy Policy</router-link></li>
          <li><router-link to="/regulation-license">Regulation & License</router-link></li>
          <li><router-link to="/terms-conditions">Terms & Conditions</router-link></li>
          <li><router-link to="/general-risk-disclosure">General Risk Disclosure</router-link></li>
          <li><router-link to="/key-information-documents">Key Information Documents</router-link></li>
        </ul>
      </nav>

      <!-- About Us and Social Media -->
      <div class="footer-section">
        <h2>About Us</h2>
        <p>
          <router-link to="/about-us">Learn more about Fintastical and our mission.</router-link>
        </p>

        <div class="social-media">
          <h2>Follow Us</h2>
          <div class="social-icons">
            <!-- Social media icons here -->
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="footer-section">
        <h2>FAQ</h2>
        <ul>
          <li><router-link to="/why-choose-fintastical">Why choose Fintastical</router-link></li>
          <li><router-link to="/fintastical-reviews">Fintastical Reviews</router-link></li>
          <li><router-link to="/our-offices">Our Offices</router-link></li>
          <li><router-link to="/accessibility">Accessibility</router-link></li>
        </ul>
      </div>

      <!-- Newsletter and Contact Form -->
      <div class="footer-section">
        <h2>Subscribe to our Newsletter</h2>
        <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>

        <h2>Contact Us</h2>
        <form @submit.prevent="sendMessage" class="contact-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Your message..." required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>

    <!-- Copyright notice -->
    <p class="copyright">&copy; 2025 Fintastical. All rights reserved.</p>
  </footer>
</template>
