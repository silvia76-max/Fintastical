<template>
  <div class="investment-summary">
    <!-- User Info Section -->
    <div class="summary-card user-info">
      <h2>Bienvenido, {{ userName }}</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Inversión Total</span>
          <span class="stat-value">${{ totalInvestment.toFixed(2) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Valor Actual</span>
          <span class="stat-value">${{ currentTotalValue.toFixed(2) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label" :class="totalProfit >= 0 ? 'profit' : 'loss'">
            {{ totalProfit >= 0 ? 'Ganancia Total' : 'Pérdida Total' }}
          </span>
          <span class="stat-value" :class="totalProfit >= 0 ? 'profit' : 'loss'">
            ${{ Math.abs(totalProfit).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Latest Investment Section -->
    <div v-if="latestInvestment" class="summary-card latest-investment">
      <h3>Última Inversión</h3>
      <div class="latest-investment-details">
        <div class="company-info">
          <span class="company-code">{{ latestInvestment.code }}</span>
          <span class="company-name">{{ getCompanyName(latestInvestment.code) }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Acciones</th>
              <th>Precio por acción</th>
              <th>Inversión total</th>
              <th>Fecha</th>
              <th>Valor actual</th>
              <th>Ganancia/Pérdida</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ latestInvestment.shares }}</td>
              <td>${{ latestInvestment.purchase_price }}</td>
              <td>${{ (latestInvestment.shares * latestInvestment.purchase_price).toFixed(2) }}</td>
              <td>{{ formatDate(latestInvestment.purchase_date) }}</td>
              <td>${{ stockValues[latestInvestment.code] || 'Cargando...' }}</td>
              <td :class="getLatestProfitClass">
                {{ getLatestProfitIndicator }} ${{ Math.abs(latestProfit).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>


  </div>
</template>
  
  <script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/composables/useApi'

const auth = useAuthStore()
const api = useApi()

// Data refs
const assets = ref([])
const companies = ref([])
const stockValues = ref({})

// Computed properties
const userName = computed(() => auth.user?.name || 'Usuario')

const totalInvestment = computed(() => {
  return assets.value.reduce((sum, asset) => {
    return sum + asset.shares * asset.purchase_price
  }, 0)
})

const currentTotalValue = computed(() => {
  return assets.value.reduce((sum, asset) => {
    const currentPrice = stockValues.value[asset.code] || 0
    return sum + asset.shares * currentPrice
  }, 0)
})

const totalProfit = computed(() => {
  return currentTotalValue.value - totalInvestment.value
})

const latestInvestment = computed(() => {
  if (!assets.value.length) return null
  return [...assets.value].sort((a, b) => new Date(b.purchase_date) - new Date(a.purchase_date))[0]
})

const latestProfit = computed(() => {
  if (!latestInvestment.value) return 0
  const currentPrice = stockValues.value[latestInvestment.value.code] || 0
  return (currentPrice - latestInvestment.value.purchase_price) * latestInvestment.value.shares
})

const getLatestProfitClass = computed(() => {
  return latestProfit.value >= 0 ? 'profit' : 'loss'
})

const getLatestProfitIndicator = computed(() => {
  return latestProfit.value >= 0 ? 'Ganancia:' : 'Pérdida:'
})


const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}

const getCompanyName = (code) => {
  const company = companies.value.find((c) => c.code === code)
  return company ? company.name : code
}

const getCurrentStockValue = async (code) => {
  try {
    await api.fetchData(`http://localhost:8111/${code}`)
    const price = api.data.value.values[0].close
    stockValues.value[code] = Number(parseFloat(price).toFixed(2))
  } catch (err) {
    console.error('Error obteniendo el valor actual:', err)
    stockValues.value[code] = null
  }
}

const fetchData = async () => {
  try {
    const userId = auth.user?.id

    // fetch assets
    await api.fetchData(`http://localhost:3000/assets?user_id=${userId}`)
    assets.value = api.data.value || []

    // fetch companies
    await api.fetchData('http://localhost:3000/companies')
    companies.value = api.data.value || []
  } catch (err) {
    console.error('Error cargando datos:', err)
  }
}

// update
watchEffect(() => {
  assets.value.forEach((asset) => {
    getCurrentStockValue(asset.code)
  })
})


onMounted(fetchData)
</script>
  
  <style scoped>
.investment-summary {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.summary-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.user-info h2 {
  color: var(--purple);
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--purple);
}

.latest-investment h3 {
  color: var(--purple);
  margin-bottom: 16px;
}

.latest-investment-details {
  display: grid;
  gap: 16px;
}

.company-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.company-code {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--purple);
}

.company-name {
  color: #64748b;
}

.investment-details,
.current-status {
  display: grid;
  gap: 8px;
  color: var(--purple-dark);
}

.portfolio-status h3 {
  color: var(--purple);
  margin-bottom: 20px;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.portfolio-item {
  background: #f8fafc;
  padding: 16px;
  border-radius: 12px;
  border: 0.2rem solid var(--purple-light);
}

.portfolio-item span {
    margin-right: 0.5rem;
}

.portfolio-header {
  margin-bottom: 12px;
}

.portfolio-stats {
  display: grid;
  gap: 8px;
  color: var(--purple-dark);
}

.profit {
  color: #22c55e;
}

.loss {
  color: #ef4444;
}
table {
  text-align: center;
}
table th {
    color: var(--purple);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }
}
</style>