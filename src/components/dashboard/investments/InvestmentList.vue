<template>
  <!-- main investments view -->
  <div class="investments-view">
    <h1>Investments</h1>

    <!-- assets section header -->
    <div class="section-header">
      <h2>Your assets</h2>
      <!-- when this button is clicked, it sets showassetform to true -->
      <button @click="showAssetForm = true" class="btn-icon">
        ➕ Add New Asset
      </button>
    </div>

    <!-- if there are assets, display the assets grid -->
    <div v-if="investmentStore.assets.length > 0" class="assets-grid">
      <!-- loop through each asset -->
      <div v-for="asset in investmentStore.assets" :key="asset.id" class="asset-card">
        <!-- asset header showing ticker and purchase date -->
        <div class="asset-header">
          <span class="ticker">{{ asset.code }}</span>
          <span class="date">{{ formatDate(asset.purchase_date) }}</span>
        </div>

        <!-- asset details as a table -->
        <table class="asset-details-table">
          <tbody>
            <!-- row for shares -->
            <tr>
              <td class="detail-label">💼 Shares</td>
              <td class="detail-value">{{ asset.shares }}</td>
            </tr>
            <!-- row for price per share -->
            <tr>
              <td class="detail-label">💲 Price/share</td>
              <td class="detail-value">${{ asset.purchase_price }}</td>
            </tr>
            <!-- row for total investment -->
            <tr>
              <td class="detail-label">📊 Investment</td>
              <td class="detail-value">${{ (asset.shares * asset.purchase_price).toFixed(2) }}</td>
            </tr>
            <!-- row for current value -->
            <tr>
              <td class="detail-label">💰 Current value</td>
              <td class="detail-value">${{ investmentStore.stockValues[asset.code] }}</td>
            </tr>
            <!-- row for profit or loss -->
            <tr>
              <td class="detail-label">📈 {{ getAssetProfit(asset) >= 0 ? 'Profit' : 'Loss' }}</td>
              <td class="detail-value">${{ getAssetProfit(asset) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- asset actions (alert and delete buttons) -->
        <div class="asset-actions">
          <button @click="openAlertModal(asset.code)" class="btn-alert">➕ Alert</button>
          <button @click="handleDeleteAsset(asset.id)" class="btn-delete">🗑️ Delete</button>
        </div>
      </div>
    </div>
    <!-- if no assets are present, show an empty state message -->
    <p v-else class="empty-state">You have no registered assets</p>

    <!-- assets modal for adding a new asset -->
    <div v-if="showAssetForm" class="modal-backdrop">
      <div class="modal">
        <h3>Add New Asset</h3>
        <!-- when the form is submitted, handleaddasset is called -->
        <form @submit.prevent="handleAddAsset" class="asset-form">
          <input
            v-model="newAsset.code"
            placeholder="Code or Symbol (ej: AAPL)"
            list="companyList"
            required
          >
          <datalist id="companyList">
            <!-- loop through companies for suggestions -->
            <option v-for="company in investmentStore.companies" :key="company.code" :value="company.code">
              {{ company.name }} ({{ company.code }})
            </option>
          </datalist>
          <input
            v-model.number="newAsset.shares"
            type="number"
            placeholder="Ammount of shares"
            min="1"
            required
          >
          <input
            v-model.number="newAsset.pricePerShare"
            type="number"
            placeholder="Price per share ($)"
            step="0.01"
            min="0.01"
            required
          >
          <!-- modal actions: cancel or save -->
          <div class="modal-actions">
            <button type="button" @click="showAssetForm = false" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-confirm">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- alerts section -->
    <h2>Active Alerts</h2>
    <div v-if="alerts.length > 0" class="alerts-grid">
      <!-- loop through each alert -->
      <div v-for="alert in alerts" :key="alert.id" class="alert-card" :class="alert.type">
        <div class="alert-header">
          <span class="ticker">{{ alert.asset_code }}</span>
          <!-- show type badge based on alert type -->
          <span class="type-badge" :class="alert.type">
            {{ alert.type === 'up' ? '▲ Up' : '▼ Down' }}
          </span>
        </div>
        <p class="target-price">🎯 Target: ${{ alert.target_price }}</p>
        <div class="alert-footer">
          <span class="date">{{ formatDate(alert.created_at) }} </span>
          <button @click="deleteAlert(alert.id)" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
    <!-- if no alerts exist, show empty state -->
    <p v-else class="empty-state">There are no active alerts</p>

    <!-- alert modal for creating a new alert -->
    <div v-if="showAlertModal" class="modal-backdrop">
      <div class="modal">
        <h3>Nueva Alerta para {{ selectedAsset }}</h3>
        <!-- on submit, handleaddalert is called -->
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
          <!-- modal actions: cancel or set alert -->
          <div class="modal-actions">
            <button type="button" @click="showAlertModal = false" class="btn-cancel">Cancel</button>
            <button type="submit" class="btn-confirm">Set alert</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useInvestmentStore } from '@/stores/investments'
import { useApi } from '@/composables/useApi'

// initialize auth, investment store and api composable
const auth = useAuthStore()
const investmentStore = useInvestmentStore()
const api = useApi()

// define local state for alerts and modals
const alerts = ref([])
const showAssetForm = ref(false)
const showAlertModal = ref(false)
const selectedAsset = ref('')

// define reactive state for new asset form
const newAsset = ref({
  code: '',
  shares: null,
  pricePerShare: null
})

// define reactive state for new alert form
const newAlert = ref({
  type: 'up',
  target: null
})

// function to format a date string using spanish locale
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}

// function to calculate profit or loss for an asset
const getAssetProfit = (asset) => {
  const currentPrice = investmentStore.stockValues[asset.code] || 0
  return Number(parseFloat((currentPrice - asset.purchase_price) * asset.shares).toFixed(2))
}

// function to add a new asset; creates payload and calls addasset on the store
const handleAddAsset = async () => {
  try {
    const payload = {
      user_id: auth.user.id,
      code: newAsset.value.code,
      shares: newAsset.value.shares,
      purchase_price: newAsset.value.pricePerShare,
      purchase_date: new Date().toISOString().split('T')[0]
    }
    await investmentStore.addAsset(payload)
    showAssetForm.value = false
    newAsset.value = { code: '', shares: null, pricePerShare: null }
  } catch (err) {
    console.error('error agregando activo:', err)
  }
}

// function to delete an asset by id
const handleDeleteAsset = async (id) => {
  try {
    await investmentStore.deleteAsset(id)
  } catch (err) {
    console.error('error eliminando activo:', err)
  }
}

// function to open the alert modal for a specific asset
const openAlertModal = (assetCode) => {
  selectedAsset.value = assetCode
  showAlertModal.value = true
}

// function to add a new alert; creates payload and posts data to api
const handleAddAlert = async () => {
  try {
    const payload = {
      user_id: auth.user.id,
      asset_code: selectedAsset.value,
      type: newAlert.value.type,
      target_price: newAlert.value.target,
      created_at: new Date().toISOString().split('T')[0]
    }
    await api.postData('http://localhost:3000/alerts', payload)
    await fetchAlerts()
    showAlertModal.value = false
    newAlert.value = { type: 'up', target: null }
  } catch (err) {
    console.error('error creando alerta:', err)
  }
}

// function to delete an alert by id and refresh alerts
const deleteAlert = async (id) => {
  try {
    await api.deleteData(`http://localhost:3000/alerts/${id}`)
    await fetchAlerts()
  } catch (err) {
    console.error('error eliminando alerta:', err)
  }
}

// function to fetch alerts from the api
const fetchAlerts = async () => {
  try {
    const userId = auth.user?.id
    await api.fetchData(`http://localhost:3000/alerts?user_id=${userId}`)
    alerts.value = api.data.value || []
  } catch (err) {
    console.error('error cargando alertas:', err)
  }
}

// on mounted, fetch assets, companies, alerts and update stock values
onMounted(async () => {
  await investmentStore.fetchAssets()
  await investmentStore.fetchCompanies()
  await fetchAlerts()
  investmentStore.updateStockValues()
})
</script>

<style scoped>
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
.asset-form {
  background: #d9f2ff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
.assets-grid, .alerts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin: 25px 0;
}
.asset-card, .alert-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
  color: var(--purple);
}
.target-price {
  color: var(--purple-dark);
}
.asset-card:hover {
  transform: translateY(-3px);
}
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
/* asset details table styles */
.asset-details-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 16px;
  border: 1px solid var(--purple-light);
  border-radius: 16px;
  overflow: hidden;
  font-size: 1.5rem;
  background-color: var(--purple-light);
}
.asset-details-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--purple-light);
  color: var(--purple-dark);
  background-color: var(--purple-light);
}
.asset-details-table tr:last-child td {
  border-bottom: none;
}
.detail-label {
  font-weight: 600;
  width: 60%;
  background-color: var(--purple-light);
}
.detail-value {
  width: 40%;
  text-align: right;
  background-color: #ffffff !important;
}
.btn-icon {
  background: var(--purple);
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
  background: var(--purple-hover);
  transform: translateY(-1px);
}
.btn-icon:active {
  transform: translateY(0);
}
.asset-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}
.btn-alert {
  background: var(--purple);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  flex: 1;
}
.btn-alert:hover {
  background: var(--purple-hover);
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
</style>
