<template>
  <div class="contact-map-wrapper">
    <!-- contact form container -->
    <div class="contact-container">
      <h1>Contact Us</h1>
      <p>
        If you have any questions or need us to help you with a specific topic, do not hesitate to contact us through the following form.
      </p>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" placeholder="Enter your name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required />
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" v-model="form.subject" placeholder="Enter the subject" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" placeholder="Enter your message" required></textarea>
        </div>
        <!-- file upload input -->
        <div class="form-group">
          <label for="file-upload">Upload a Contact File</label>
          <input type="file" @change="handleFileUpload" id="file-upload" />
        </div>
        <button type="submit" class="submit-btn">Submit</button>
      </form>
      <!-- display file content -->
      <div v-if="fileContent" class="file-content">
        <h2>File Content:</h2>
        <pre>{{ fileContent }}</pre>
      </div>
      <!-- success message -->
      <div v-if="formSubmitted" class="success-message">
        Thank you for reaching out! We will get back to you soon.
      </div>
      <!-- popup confirmation -->
      <div v-if="showPopup" class="popup-overlay">
        <div class="popup-content">
          <p>We have received your details and will contact you shortly. Thank you for your patience.</p>
          <button @click="closePopup">Close</button>
        </div>
      </div>
    </div>

    <!-- map container -->
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9921.580742178235!2d-0.10874529083371688!3d51.51766570000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b1f29d917ad%3A0xf3fa0498c14db63c!2s456%20Business%20Ave%2C%20London%2C%20UK%20EC1A%201BB!5e0!3m2!1sen!2sin!4v1678208291173!5m2!1sen!2sin"
      width="600"
      height="450"
      class="map-container"
      style="border:0;"
      allowfullscreen=""
      loading="lazy">
    </iframe>
  </div>

  <!-- our offices section -->
  <div class="our-offices">
    <h1>Our Offices</h1>
    <p>Visit us at one of our locations worldwide.</p>
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

<script setup>
import { ref, onMounted } from 'vue' // Importing necessary Vue functions

// Reactive variables for form data
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const fileContent = ref(null) // Stores uploaded file content
const formSubmitted = ref(false) // Tracks if form has been submitted
const showPopup = ref(false) // Controls visibility of the success popup

// Function to handle form submission
const handleSubmit = async () => {
  console.log('Form submitted:', form.value) // Log submitted form data
  formSubmitted.value = true // Mark form as submitted
  showPopup.value = true // Show success popup

  // Prepare form data
  const data = { ...form.value }

  try {
    // Send form data to the local server
    const response = await fetch("http://localhost:3000/contactos", {
      method: "POST", // Use POST method for submission
      headers: { "Content-Type": "application/json" }, // Set content type to JSON
      body: JSON.stringify(data) // Convert data to JSON
    })

    // Parse server response
    const result = await response.json()
    console.log("Server response:", result) // Log server response

    if (response.ok) {
      // If successful, reset form fields
      form.value = { name: '', email: '', subject: '', message: '' }
    } else {
      alert("Error sending message") // Show error alert if request fails
    }
  } catch (error) {
    // Handle network errors
    console.error("Connection error:", error)
    alert("Connection error with server") // Show error alert
  }
}

// Function to handle file uploads
const handleFileUpload = (event) => {
  const file = event.target.files[0] // Get the first selected file

  // Check if the file is a plain text file
  if (file && file.type === 'text/plain') {
    const reader = new FileReader() // Create a FileReader instance
    reader.onload = () => {
      fileContent.value = reader.result // Store the file content
    }
    reader.readAsText(file) // Read file as text
  } else {
    alert('Only text files are allowed.') // Show alert for invalid file type
  }
}

// Function to close the success popup
const closePopup = () => {
  showPopup.value = false // Hide popup
  fileContent.value = null // Clear uploaded file content
}

// Function to load Google Maps dynamically
const loadGoogleMaps = () => {
  // Check if Google Maps API is already loaded
  if (window.google && window.google.maps) {
    initMap() // Initialize map if already loaded
    return
  }

  // Create a new script element to load Google Maps API
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap`
  script.async = true // Load script asynchronously
  script.defer = true // Defer execution
  script.onload = () => { initMap() } // Initialize map after script loads
  document.head.appendChild(script) // Append script to document head
}

// Function to initialize Google Map
const initMap = () => {
  const mapElement = document.getElementById('map') // Get the map container element

  if (mapElement) {
    // Create a new Google Map instance
    const map = new window.google.maps.Map(mapElement, {
      center: { lat: 40.7128, lng: -74.0060 }, // Set map center (New York City)
      zoom: 12 // Set zoom level
    })

    // Add a marker to the map
    new window.google.maps.Marker({
      position: { lat: 40.7128, lng: -74.0060 }, // Marker position
      map: map, // Attach marker to map
      title: 'Our location' // Tooltip text
    })
  }
}

// Run loadGoogleMaps function when the component is mounted
onMounted(() => {
  loadGoogleMaps()
})
</script>

<style scoped>
/* container for contact form and map side by side on desktop, stacked on mobile */
.contact-map-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
}

/* contact form styling */
.contact-container {
  flex: 1;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

/* map container styling */
.map-container {
  flex: 1;
  height: 450px;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* headings and paragraphs */
h1 {
  text-align: center;
  color: #333;
  font-weight: bold;
  margin-bottom: 1rem;
}
p {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
}

/* form group styling */
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

/* inputs and textarea with purple borders and border radius similar to buttons */
input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--purple);
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 16px;
  box-sizing: border-box;
}
textarea {
  min-height: 120px;
}

/* submit button styling */
button.submit-btn {
  width: 100%;
  padding: 12px;
  color: white;
  background-color: #6046b0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}
button.submit-btn:hover {
  background-color: #8f6aff;
}

/* file content display styling */
.file-content {
  margin: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: monospace;
}

/* success message styling */
.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #e6ffe6;
  color: #4caf50;
  text-align: center;
  border-radius: 8px;
}

/* popup overlay styling */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 300px;
}
.popup-content p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  color: #333;
}
.popup-content button {
  background-color: #6046b0;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.popup-content button:hover {
  background-color: #8f6aff;
}

/* our offices section styling */
.our-offices {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.office-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  margin-top: 10px;
}
.office {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 30%;
  min-width: 250px;
  text-align: center;
}
.office h3 {
  color: #6046b0;
  font-size: 30px;
  margin-bottom: 8px;
}
.office p {
  color: #333;
  font-size: 18px;
  margin: 5px 0;
}

/* responsive styles */
@media (max-width: 1024px) {
  .contact-map-wrapper {
    flex-direction: column;
    align-items: center;
  }
  .map-container {
    width: 100%;
    height: 450px;
  }
  .contact-container {
    width: 100%;
  }
  /* center the office cards on smaller screens */
  .office-list {
    justify-content: center;
  }
}
@media (max-width: 600px) {
  .contact-map-wrapper {
    padding: 1rem;
  }
  input,
  textarea {
    font-size: 14px;
  }
  button.submit-btn {
    font-size: 0.9rem;
  }
}
</style>
