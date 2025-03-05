<template>
  <div class="investments-view">
    <h1>Mis Inversiones</h1>

    <!-- SECCIÓN DE ACTIVOS -->
    <div class="section-header">
      <h2>Tus Activos</h2>
      <button @click="showAssetForm = true" class="btn-icon">
        ＋ Agregar
      </button>
    </div>

    <!-- LISTA DE ACTIVOS -->
    <div v-if="assets.length > 0" class="assets-grid">
      <div v-for="asset in assets" :key="asset.id" class="asset-card">
        <div class="asset-header">
          <span class="ticker">{{ asset.code }}</span>
          <span class="date">{{ formatDate(asset.purchase_date) }}</span>
        </div>

        <div class="asset-details">
          <p>🪙 Acciones: {{ asset.shares }}</p>
          <p>💰 Precio/acción: ${{ asset.purchase_price }}</p>
          <p>📈 Inversión: ${{ asset.shares * asset.purchase_price }}</p>
        </div>

        <div class="asset-actions">
          <button @click="openAlertModal(asset.code)" class="btn-alert">➕ Alerta</button>
          <button @click="deleteAsset(asset.id)" class="btn-delete">🗑️ Eliminar</button>
        </div>
      </div>
    </div>
    <p v-else class="empty-state">No tienes activos registrados</p>

    <!-- MODAL DE ACTIVOS -->
    <div v-if="showAssetForm" class="modal-backdrop">
      <div class="modal">
        <h3>Agregar Nuevo Activo</h3>
        <form @submit.prevent="handleAddAsset" class="asset-form">
          <input
            v-model="newAsset.code"
            placeholder="Código (ej: AAPL)"
            list="companyList"
            required
          >

          <datalist id="companyList">
            <option v-for="company in companies" :key="company.code" :value="company.code">
              {{ company.name }} ({{ company.code }})
            </option>
          </datalist>

          <input
            v-model.number="newAsset.shares"
            type="number"
            placeholder="Cantidad de acciones"
            min="1"
            required
          >

          <input
            v-model.number="newAsset.pricePerShare"
            type="number"
            placeholder="Precio por acción ($)"
            step="0.01"
            min="0.01"
            required
          >

          <div class="modal-actions">
            <button type="button" @click="showAssetForm = false" class="btn-cancel">Cancelar</button>
            <button type="submit" class="btn-confirm">Guardar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- SECCIÓN DE ALERTAS -->
    <h2>Alertas Activas</h2>
    <div v-if="alerts.length > 0" class="alerts-grid">
      <div v-for="alert in alerts" :key="alert.id" class="alert-card" :class="alert.type">
        <div class="alert-header">
          <span class="ticker">{{ alert.asset_code }}</span>
          <span class="type-badge" :class="alert.type">
            {{ alert.type === 'up' ? '▲ Subida' : '▼ Bajada' }}
          </span>
        </div>

        <p class="target-price">🎯 Objetivo: ${{ alert.target_price }}</p>

        <div class="alert-footer">
          <span class="date">{{ formatDate(alert.created_at) }}</span>
          <button @click="deleteAlert(alert.id)" class="btn-delete">Eliminar</button>
        </div>
      </div>
    </div>
    <p v-else class="empty-state">No hay alertas activas</p>

    <!-- MODAL DE ALERTAS -->
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

// Lista de compañías
const companies = ref([
  { code: 'AAPL', name: 'Apple Inc.' },
  { code: 'META', name: 'Meta Platforms' },
  { code: 'TSLA', name: 'Tesla' },
  { code: 'NVDA', name: 'NVIDIA' },
  { code: 'MSFT', name: 'Microsoft' }
]);

// Formularios
const newAsset = ref({
  code: '',
  shares: null,
  pricePerShare: null
});

const newAlert = ref({
  type: 'up',
  target: null
});

// Funciones
const fetchData = async () => {
  try {
    const userId = auth.user?.id;

    // Cargar activos
    await api.fetchData(`http://localhost:3000/assets?user_id=${userId}`);
    assets.value = api.data.value || [];

    // Cargar alertas
    await api.fetchData(`http://localhost:3000/alerts?user_id=${userId}`);
    alerts.value = api.data.value || [];

  } catch (err) {
    console.error('Error cargando datos:', err);
  }
};

const handleAddAsset = async () => {
  try {
    const payload = {
      user_id: auth.user.id,
      code: newAsset.value.code,
      shares: newAsset.value.shares,
      purchase_price: newAsset.value.pricePerShare,
      purchase_date: new Date().toISOString().split('T')[0]
    };

    await api.postData('http://localhost:3000/assets', payload);
    await fetchData();
    showAssetForm.value = false;
    newAsset.value = { code: '', shares: null, pricePerShare: null };

  } catch (err) {
    console.error('Error agregando activo:', err);
  }
};

const deleteAsset = async (id) => {
  try {
    await api.deleteData(`http://localhost:3000/assets/${id}`);
    await fetchData();
  } catch (err) {
    console.error('Error eliminando activo:', err);
  }
};

const openAlertModal = (assetCode) => {
  selectedAsset.value = assetCode;
  showAlertModal.value = true;
};

const handleAddAlert = async () => {
  try {
    const payload = {
      user_id: auth.user.id,
      asset_code: selectedAsset.value,
      type: newAlert.value.type,
      target_price: newAlert.value.target,
      created_at: new Date().toISOString().split('T')[0]
    };

    await api.postData('http://localhost:3000/alerts', payload);
    await fetchData();
    showAlertModal.value = false;
    newAlert.value = { type: 'up', target: null };

  } catch (err) {
    console.error('Error creando alerta:', err);
  }
};

const deleteAlert = async (id) => {
  try {
    await api.deleteData(`http://localhost:3000/alerts/${id}`);
    await fetchData();
  } catch (err) {
    console.error('Error eliminando alerta:', err);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES');
};

onMounted(fetchData);
</script>

<style scoped>

/* Estilos principales */
.investments-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  margin: 30px 0 20px;
}

/* Formularios */
.asset-form {
  background: #d9f2ff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.asset-form input {
  width: calc(100% - 26px);
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.calculated-investment {
  font-weight: 500;
  color: #2ecc71;
  margin: 15px 0;
}

/* Grid de activos y alertas */
.assets-grid, .alerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin: 25px 0;
}

/* Tarjetas */
.asset-card, .alert-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s;
}

.asset-card:hover {
  transform: translateY(-3px);
}

/* Detalles de activos */
.asset-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.ticker {
  font-weight: 700;
  font-size: 1.2em;
  color: #2c3e50;
}

.date {
  color: #7f8c8d;
  font-size: 0.9em;
}

.asset-details p {
  margin: 12px 0;
  color: #34495e;
}

.total-investment {
  font-weight: 600;
  color: #27ae60;
  margin-top: 18px;
}

.btn-icon {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon:hover {
  background: #2980b9;
  transform: translateY(-1px);
}

.btn-icon:active {
  transform: translateY(0);
}
/* Acciones */
.asset-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn-alert {
  background: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  flex: 1;
}

.btn-alert:hover {
  background: #72a6f5;
  color: rgb(16, 11, 59);
}

.btn-delete {
  background: #e74c3c15;
  color: #e74c3c;
  border: 1px solid #e74c3c30;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  flex: 1;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #e74c3c;
  color: white;
}

.btn-primary:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  margin-top: 10px;
  font-weight: 500;
}

/* Modal */

/* Estilos del modal mejorado */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid #eee;
  animation: modalEnter 0.3s ease-out;
}

@keyframes modalEnter {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal h3 {
  color: #2c3e50;
  margin-bottom: 25px;
  font-size: 1.4rem;
  border-bottom: 2px solid #f8f9fa;
  padding-bottom: 15px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #4a5568;
  font-weight: 500;
  font-size: 0.95rem;
}

.select-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.2s;
  background: #f8fafc;
}

.select-input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.input-field {
  width: calc(100% - 35px);
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  font-size: 1rem;
  background: #f8fafc;
  transition: all 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
}

.btn-cancel {
  background: #f8f9fa;
  color: #4a5568;
  border: 2px solid #e2e8f0;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  flex: 1;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #f1f5f9;
  border-color: #cbd5e0;
}

.btn-confirm {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  flex: 1;
  transition: all 0.2s;
}

.btn-confirm:hover {
  background: #2980b9;
}


/* Estados vacíos */
.empty-state {
  text-align: center;
  padding: 40px;
  color: #95a5a6;
  border: 2px dashed #bdc3c7;
  border-radius: 15px;
  margin: 30px 0;
}
</style>
