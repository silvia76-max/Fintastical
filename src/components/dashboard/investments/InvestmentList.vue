<template>
  <div class="investments-view">
    <h1>My Investments</h1>

    <!-- Sección de Assets -->
    <div class="section-header">
      <h2>Tus Activos</h2>
      <button @click="showAssetForm = !showAssetForm" class="btn-icon">
        <span v-if="!showAssetForm">＋ Agregar</span>
        <span v-else>× Cancelar</span>
      </button>
    </div>

    <form v-if="showAssetForm" @submit.prevent="handleAddAsset" class="asset-form">
      <input v-model="newAsset.code" placeholder="Código (ej: AAPL)" list="companyList" required>

<datalist id="companyList">
  <option v-for="company in companies" :key="company.code" :value="company.code">
    {{ company.name }} ({{ company.code }})
  </option>
</datalist>
      <input v-model.number="newAsset.amount" type="number" placeholder="Invested ammount" step="0.01" required>
      <input v-model.number="newAsset.price" type="number" placeholder="Purchased price" step="0.01" required>
      <input v-model="newAsset.date" type="date" required>
      <button type="submit" class="btn-primary">Guardar activo</button>
    </form>

    <div v-if="assets.length > 0" class="assets-grid">
    <div v-for="asset in assets" :key="asset.id" class="asset-card">
      <div class="asset-header">
        <span class="ticker">{{ asset.code }}</span>
        <span class="date">{{ formatDate(asset.purchase_date) }}</span>
      </div>
      <div class="asset-details">
        <p>Inversión: ${{ asset.investment_amount.toLocaleString() }}</p>
        <p>Precio compra: ${{ asset.purchase_price.toFixed(2) }}</p>
      </div>
      <div class="asset-actions">
        <button @click="openAlertModal(asset.code)" class="btn-alert">➕ Alerta</button>
        <button @click="deleteAsset(asset.id)" class="btn-delete">🗑️ Eliminar</button>
      </div>
    </div>
  </div>
    <p v-else class="empty-state">No tienes activos registrados</p>

    <!-- Sección de Alertas -->
    <h2>Alertas Activas</h2>
    <div v-if="alerts.length > 0" class="alerts-grid">
      <div v-for="alert in alerts" :key="alert.id" class="alert-card" :class="alert.type">
        <div class="alert-header">
          <span class="ticker">{{ alert.asset_code }}</span>
          <span class="type-badge" :class="alert.type">
            {{ alert.type === 'up' ? '▲ Subida' : '▼ Bajada' }}
          </span>
        </div>
        <p class="target-price">Objetivo: ${{ alert.target_price.toFixed(2) }}</p>
        <div class="alert-footer">
          <span class="date">{{ formatDate(alert.created_at) }}</span>
          <button @click="deleteAlert(alert.id)" class="btn-delete">Eliminar</button>
        </div>
      </div>
    </div>
    <p v-else class="empty-state">No hay alertas activas</p>

    <!-- Modal de Alertas -->
    <div v-if="showAlertModal" class="modal-backdrop">
      <div class="modal">
        <h3>Nueva Alerta para {{ selectedAsset }}</h3>
        <form @submit.prevent="handleAddAlert">
          <div class="form-group">
            <label>Tipo de alerta:</label>
            <select v-model="newAlert.type" class="select-input">
              <option value="up">Alerta de Subida</option>
              <option value="down">Alerta de Bajada</option>
            </select>
          </div>

          <div class="form-group">
            <label>Precio objetivo:</label>
            <input
              v-model.number="newAlert.target"
              type="number"
              step="0.01"
              class="input-field"
              required
            >
          </div>

          <div class="modal-actions">
            <button type="button" @click="showAlertModal = false" class="btn-cancel">Cancelar</button>
            <button type="submit" class="btn-confirm">Crear Alerta</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useApi } from '@/composables/useApi';

const auth = useAuthStore();
const api = useApi();

// Datos
const assets = ref([]);
const alerts = ref([]);
const showAssetForm = ref(false);
const showAlertModal = ref(false);
const selectedAsset = ref('');

// Formularios
const newAsset = ref({
  code: '',
  amount: null,
  price: null,
  date: ''
});

const newAlert = ref({
  type: 'up',
  target: null
});

// Lista de compañías
const companies = ref([
  { code: 'AAPL', name: 'Apple Inc.' },
  { code: 'META', name: 'Meta Platforms' },
  { code: 'MSFT', name: 'Microsoft' },
  { code: 'NVDA', name: 'NVIDIA' },
  { code: 'IBM', name: 'International Business Machines' },
  { code: 'TSLA', name: 'Tesla' },
  { code: 'GOOGL', name: 'Alphabet (Google)' }
]);

// Funciones
const fetchData = async () => {
  if (!auth.user?.id) return;

  try {
    // Obtener assets
    await api.fetchData(`http://localhost:3000/assets?user_id=${auth.user.id}`);
    assets.value = api.data.value || [];

    // Obtener alertas
    await api.fetchData(`http://localhost:3000/alerts?user_id=${auth.user.id}`);
    alerts.value = api.data.value || [];
  } catch (err) {
    console.error('Error cargando datos:', err);
  }
};

// Modales:
const openAlertModal = (assetCode) => {
  selectedAsset.value = assetCode;
  showAlertModal.value = true;
  newAlert.value = { type: 'up', target: null }; // Resetear formulario
};

const handleAddAsset = async () => {
  try {
    await api.postData('http://localhost:3000/assets', {
      user_id: auth.user.id,
      code: newAsset.value.code,
      investment_amount: newAsset.value.amount,
      purchase_price: newAsset.value.price,
      purchase_date: newAsset.value.date
    });

    fetchData();
    showAssetForm.value = false;
    newAsset.value = { code: '', amount: null, price: null, date: '' };
  } catch (err) {
    console.error('Error agregando activo:', err);
  }
};

const handleAddAlert = async () => {
  try {
    await api.postData('http://localhost:3000/alerts', {
      user_id: auth.user.id,
      asset_code: selectedAsset.value,
      type: newAlert.value.type,
      target_price: newAlert.value.target,
      status: 'active',
      created_at: new Date().toISOString().split('T')[0]
    });

    await fetchData();
    showAlertModal.value = false;
  } catch (err) {
    console.error('Error creando alerta:', err);
  }
};

// Función para eliminar assets
const deleteAsset = async (id) => {
  try {
    await api.deleteData(`http://localhost:3000/assets/${id}`);
    await fetchData(); // Recargar datos
  } catch (err) {
    console.error('Error eliminando activo:', err);
  }
};

// Función para eliminar alerts
const deleteAlert = async (id) => {
  try {
    await api.deleteData(`http://localhost:3000/alerts/${id}`);
    await fetchData();

    console.log('Alerta eliminada:', id); // Para depuración
  } catch (err) {
    console.error('Error eliminando alerta:', err.response?.data || err.message);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES');
};

onMounted(fetchData);
</script>

<style scoped>
.investments-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.assets-grid, .alerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.asset-card, .alert-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.asset-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.ticker {
  font-weight: 700;
  color: #2c3e50;
}

.date {
  color: #7f8c8d;
  font-size: 0.9em;
}

.btn-alert {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}

input[list="companyList"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #3498db;
  border-radius: 8px;
  font-size: 16px;
}

/* Mejoras visuales del datalist (sugerencias) */
datalist option {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

datalist option:hover {
  background: #f8f9fa;
}

/* Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 25px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Formulario del modal */
.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
}

.select-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f8f9fa;
  font-size: 1rem;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.input-field:focus,
.select-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

/* Botones del modal */
.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 25px;
}

.btn-cancel {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  flex: 1;
  transition: background 0.2s;
}

.btn-confirm {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  flex: 1;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #7f8c8d;
}

.btn-confirm:hover {
  background: #2980b9;
}
.asset-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-delete {
  background: #ff475710;
  color: #ff4757;
  border: 1px solid #ff475730;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #ff4757;
  color: white;
}

/* Mejoras para las tarjetas */
.asset-card {
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.asset-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.alert-card {
  border-left: 4px solid;
}

.alert-card.up {
  border-color: #3498db;
}

.alert-card.down {
  border-color: #e74c3c;
}

.type-badge {
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
}

.type-badge.up {
  background: #3498db20;
  color: #3498db;
}

.type-badge.down {
  background: #e74c3c20;
  color: #e74c3c;
}

.target-price {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 15px 0;
  color: #2c3e50;
}

/* Estado hover para botones */
.btn-delete {
  background: #e74c3c10;
  color: #e74c3c;
  border: 1px solid #e74c3c30;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #e74c3c;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #7f8c8d;
  border: 2px dashed #bdc3c7;
  border-radius: 8px;
  margin: 20px 0;
}
</style>
