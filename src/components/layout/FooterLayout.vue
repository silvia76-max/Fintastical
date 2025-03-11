<!-- eslint-disable no-unused-vars -->
<template>
  <footer class="footer-layout">
    <!-- Logo from the public folder -->
    <div class="logo-container">
      <img src="@/assets/img/Fintastical-logo-footer.svg" alt="Fintastical Logo" class="logo" />

    </div>

    <!-- Main content in rows -->
    <div class="footer-content">
      <!-- Columna 1: Textos legales -->
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

      <!-- Columna 2: FAQs y redes sociales -->
      <div class="footer-section">
        <h2>FAQ</h2>
        <ul>
          <li><router-link to="/why-choose-fintastical">Why choose Fintastical</router-link></li>
          <li><router-link to="/fintastical-reviews">Fintastical Reviews</router-link></li>
          <li><router-link to="/our-offices">Our Offices</router-link></li>
          <li><router-link to="/accessibility">Accessibility</router-link></li>
        </ul>

        <!-- Redes sociales -->
        <div class="social-media">
          <h2>Follow Us</h2>
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.733 0 1.325-.592 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Columna 3: Newsletter y formulario de contacto -->
      <div class="footer-section">
        <h2>Subscribe to our Newsletter</h2>
        <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>

        <h2>Contact Us</h2>
        <form @submit.prevent="handleSubmit" class="contact-form">

        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" placeholder="Enter your name" required />



        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required />



        <label for="subject">Subject</label>
        <input type="text" id="subject" v-model="form.subject" placeholder="Enter the subject" required />



        <label for="message">Message</label>
        <input type="text" id="message" v-model="form.message" placeholder="Enter your message" required />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>

    <!-- Copyright notice -->
    <p class="copyright">&copy; 2025 Fintastical. All rights reserved.</p>

    <!-- Success Message -->
    <div v-if="formSubmitted" class="success-message">
      Thank you for reaching out! We will get back to you soon.
    </div>

    <!-- Pop-up de confirmación -->
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <p>Su consulta se envió correctamente, en breve le contactaremos. Gracias por su paciencia.</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Reactive variables for the form
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});
const formSubmitted = ref(false); // Track if the form has been submitted
const showPopup = ref(false); // Controls visibility of the popup

// handleSubmit function
const handleSubmit = async () => {
  console.log('Form Submitted:', form.value);

  // Prepare the form data for submission
  const data = { ...form.value };

  try {
    const response = await fetch("http://localhost:3000/contactos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Respuesta del servidor:", result);

    if (response.ok) {
      alert("Mensaje enviado correctamente");
      form.value = { name: '', email: '', subject: '', message: '' }; // Reset form fields
    } else {
      alert("Error al enviar el mensaje");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("Error de conexión con el servidor");
  }
};

// Form validation or other logic can be added here
onMounted(() => {
  // You can perform any necessary initialization here if needed
});
</script>

<style scoped>
.footer-layout {
  background-color: #2F284C;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 250px;
  height: auto;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
}

.footer-section h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin: 8px 0;
}

.footer-section ul li a {
  color: #fff;
  text-decoration: none;
}

.footer-section ul li a:hover {
  text-decoration: underline;
}

.social-media {
  margin-top: 20px;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icons a {
  color: #fff;
  text-decoration: none;
}

.social-icons a:hover {
  color: #ddd;
}

.social-icons svg {
  width: 24px;
  height: 24px;
}

.newsletter-form,
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.newsletter-form input,
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 8px;
  color:#ddd;
  background-color: #2F284C;
  border: 3px solid #ccc;
  border-radius: 12px;
}

.newsletter-form button,
.contact-form button {
  padding: 8px 12px;
  background-color: #6046B0;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
}

.newsletter-form button:hover,
.contact-form button:hover {
  background-color: #8F6AFF;
}

.copyright {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}

/* Responsive design for smaller screens */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-section {
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>
