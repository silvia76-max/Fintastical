<template>
  <h1>Perfil del Usuario</h1>
  <div class="profile-view" v-if="isAuthenticated">
    <p>Información y configuración del perfil.</p>

    <div class="profile-data">
      <h1>Hola {{ user.name }}!</h1>
      <p>Tus datos:</p>
      <ul>
        <li>Email: {{ user.email }}</li>
        <li>ID: {{ user.id }}</li>
      </ul>
    </div>

    <h2>Alertas Recientes</h2>
    <div class="alert-container" v-if="userAlerts.length > 0">
      <div class="alert-card" v-for="alert in userAlerts" :key="alert.date">
        <p class="alert-date">{{ alert.date }}</p>
        <p class="alert-code">{{ alert.code }}</p>
        <p class="alert-type" :class="`type-${alert.type_alert}`">
          {{ capitalizeFirstLetter(alert.type_alert) }} Alert
        </p>
      </div>
    </div>
    <p v-else class="no-alerts">No hay alertas registradas</p>

    <h2>Actualizar Perfil</h2>
    <form @submit.prevent="handleUpdateProfile">
      <input
        type="text"
        v-model="name"
        placeholder="Nombre"
        class="input-field"
      >
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="input-field"
      >
      <input
        type="password"
        v-model="password"
        placeholder="Contraseña"
        class="input-field"
      >
      <button type="submit" class="update-btn">Actualizar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>

  <div v-else>
    <p>No estás autenticado. Por favor, inicia sesión.</p>
    <router-link to="/auth/login" class="login-link">Login</router-link>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/composables/useApi';

const auth = useAuthStore();
const user = computed(() => auth.user);
const isAuthenticated = computed(() => auth.isAuthenticated);

// Almacena la instancia completa del composable (no solo 'data')
const dashboardApi = useApi();
const userAlerts = ref([]);

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);

const fetchUserAlerts = async () => {
  if (user.value.id) {
    try {
      await dashboardApi.fetchData('/dashboard');
      // Acceder al valor del ref usando .value
      const dashboardsArray = dashboardApi.data.value.dashboard;
      // Validar que dashboardsArray exista
      if (!dashboardsArray) {
        throw new Error('No se encontró el array de dashboard');
      }
      // Buscar el dashboard del usuario
      const userDashboard = dashboardsArray.find(
        item => item.id === user.value.id
      );
      // Asignar las alertas
      userAlerts.value = userDashboard?.alert_history || [];
    } catch (err) {
      console.error('Error fetching alerts:', err);
    }
  }
};

// Observador para cargar las alertas cuando el usuario cambie
watch(
  () => user.value,
  async (newUser) => {
    if (newUser) {
      name.value = newUser.name || '';
      email.value = newUser.email || '';
      password.value = newUser.password || '';
      await fetchUserAlerts();
    }
  },
  { immediate: true }
);

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const handleUpdateProfile = async () => {
  error.value = null;
  if (!user.value || !user.value.id) {
    error.value = 'No estás autenticado o falta el ID del usuario';
    return;
  }
  const updatedUser = {
    id: user.value.id,
    name: name.value,
    email: email.value,
    password: password.value,
  };
  const success = await auth.updateProfile(updatedUser);
  if (!success) {
    error.value = 'Error al actualizar el perfil';
  }
};
</script>

<style scoped>
.profile-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.profile-data {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.alert-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin: 20px 0;
}

.alert-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.alert-card:hover {
  transform: translateY(-3px);
}

.alert-date {
  font-size: 0.9em;
  color: #6c757d;
  margin-bottom: 10px;
}

.alert-code {
  font-weight: bold;
  margin: 10px 0;
}

.alert-type {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8em;
  text-transform: capitalize;
}

.type-up {
  background: #d4edda;
  color: #155724;
}

.type-down {
  background: #fff3cd;
  color: #856404;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ced4da;
  border-radius: 4px;
}

.update-btn {
  background: #0d6efd;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.update-btn:hover {
  background: #0b5ed7;
}

.error {
  color: red;
  margin-top: 10px;
}

.login-link {
  color: #0d6efd;
  text-decoration: underline;
  cursor: pointer;
}

.no-alerts {
  color: #6c757d;
  text-align: center;
  margin-top: 15px;
}
</style>
