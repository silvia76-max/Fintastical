<template>
  <div class="loader-container">
    <div class="loader">
      <div class="loader__circle"></div>
      <div class="loader__circle"></div>
      <div class="loader__circle"></div>
      <div class="loader__percentage">{{ progress }}%</div>
    </div>
    <div class="loader__text">Loading</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const progress = ref(0)

// Simular progreso
setInterval(() => {
  if(progress.value < 100) progress.value += 10
}, 300)
</script>


<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  z-index: 9999;
}

.loader {
  position: relative;
  width: 80px;
  height: 80px;
}

.loader__circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-radius: 50%;
  animation: rotate 1.8s linear infinite;
}

.loader__circle:nth-child(1) {
  border-top-color: #7c3aed;
  animation-duration: 1.2s;
}

.loader__circle:nth-child(2) {
  border-left-color: #4f46e5;
  animation-duration: 1.5s;
  animation-direction: reverse;
}

.loader__circle:nth-child(3) {
  border-bottom-color: #6366f1;
  animation-duration: 2s;
}

.loader__text {
  margin-top: 1.5rem;
  color: #4f46e5;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  animation: pulse 1.5s ease-in-out infinite;
}

.loader__percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  color: #4f46e5;
  font-weight: bold;
}

.loader__circle {
  transition: all 0.3s ease;
}

.loader.complete .loader__circle {
  animation: vibrate 0.5s ease;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.95);
  }
}

@keyframes vibrate {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  75% { transform: translateX(3px); }
}
</style>
