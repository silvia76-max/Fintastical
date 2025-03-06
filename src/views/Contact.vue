<template>
  <div class="contact-container">
    <h1>Contact Us</h1>
    <p>If you have any questions or need us to help you with a specific topic, do not hesitate to contact us through the following form.</p>
    <form @submit.prevent="handleSubmit">
      <!-- Form Fields (Name, Email, Subject, Message) -->
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
        <textarea id="message" v-model="form.message" required></textarea>
      </div>

      <!-- File Upload Section -->
      <div class="form-group">
        <label for="file-upload">Upload a Contact File</label>
        <input type="file" @change="handleFileUpload" id="file-upload" />
      </div>

      <button type="submit" class="submit-btn">Submit</button>
    </form>

    <!-- Display File Content (if any) -->
    <div v-if="fileContent" class="file-content">
      <h2>File Content:</h2>
      <pre>{{ fileContent }}</pre>
    </div>

    <!-- Success Message -->
    <div v-if="formSubmitted" class="success-message">
      Thank you for reaching out! We will get back to you soon.
    </div>

    <!-- Google Map -->
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      fileContent: null,  // To store file content
      formSubmitted: false
    };
  },

  mounted() {
    // Initialize map when the component is mounted
    this.initMap();
  },

  methods: {
    handleSubmit() {
      // Handle form submission logic
      console.log('Form Submitted:', this.form);
      this.formSubmitted = true;

      // Clear form fields after submission
      this.form.name = '';
      this.form.email = '';
      this.form.subject = '';
      this.form.message = '';
    },

    // Handle file upload
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        // Once the file is read, set the content
        reader.onload = () => {
          this.fileContent = reader.result; // This will be the text content of the file
        };

        reader.readAsText(file); // Reads the file as text (can change for other types of files like PDF)
      }
    },

    // Initialize the Google Map
    initMap() {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        const map = new google.maps.Map(mapElement, {
          center: { lat: 40.7128, lng: -74.0060 },  // Set the map's center (e.g., New York)
          zoom: 12
        });

        new google.maps.Marker({
          position: { lat: 40.7128, lng: -74.0060 }, // Marker position
          map: map,
          title: 'Our Location'
        });
      }
    }
  }
};
</script>
<style scoped>
.contact-container{
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1{
  text-align: center;
  color: #333;
  font-weight: bold;
}
p{
  text-align: center;
  color: black;
}
.form-group{
  margin-bottom: 15px;
}

label{
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  background-color: #e6ffe6;
  border: 1px solid #070707;
}

input,textarea{
  width: 100%;
  padding: 10px;
  border: 1px solid #070707;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;
}

textarea{
  min-height: 120px;
}

button.submit-btn{
  width: 100%;
  padding: 12px;
  color: white;
  background-color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.submit-btn:hover{
  background-color: #b994c4;
}

.file-content{
  margin: 20px;
  padding: 10px;
  border-color: #f1f1f1;
  border-radius: 4px;
  border:  1px solid #ddd;
}

.success-message{
  margin-top: 20px;
  padding: 10px;
  background-color: #e6ffe6;
  color: #4CAF50;
  text-align: center;
  border-radius: 4px;
}
/* Google Maps Styling */
#map {
width: 100%;
height: 400px; /* You can adjust the height as needed */
margin-top: 20px;
border-radius: 8px;
border: 1px solid #ddd;
}
</style>
