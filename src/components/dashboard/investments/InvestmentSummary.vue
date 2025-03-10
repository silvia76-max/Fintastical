<template>
  <div class="investment-summary">
    <h1>Resumen</h1>
    <!-- User Info Section -->
    <div class="summary-card user-info">
      <h2>Hola, {{ userName }}</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Inversión Total</span>
          <span class="stat-value">${{ investmentStore.totalInvestment.toFixed(2) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Valor Actual</span>
          <span class="stat-value">${{ investmentStore.currentTotalValue.toFixed(2) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label" :class="investmentStore.totalProfit >= 0 ? 'profit' : 'loss'">
            {{ investmentStore.totalProfit >= 0 ? 'Ganancia Total' : 'Pérdida Total' }}
          </span>
          <span class="stat-value" :class="investmentStore.totalProfit >= 0 ? 'profit' : 'loss'">
            ${{ Math.abs(investmentStore.totalProfit).toFixed(2) }}
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
              <td>${{ investmentStore.stockValues[latestInvestment.code] || 'Cargando...' }}</td>
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
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useInvestmentStore } from '@/stores/investments'

const auth = useAuthStore()
const investmentStore = useInvestmentStore()

// Computed properties
const userName = computed(() => auth.user?.name || 'Usuario')

const latestInvestment = computed(() => investmentStore.latestInvestment)

const latestProfit = computed(() => {
  if (!latestInvestment.value) return 0
  const currentPrice = investmentStore.stockValues[latestInvestment.value.code] || 0
  return (currentPrice - latestInvestment.value.purchase_price) * latestInvestment.value.shares
})

const getLatestProfitClass = computed(() => {
  return latestProfit.value >= 0 ? 'profit' : 'loss'
})

const getLatestProfitIndicator = computed(() => {
  return latestProfit.value >= 0 ? '✅ Ganancia:' : '🔻 Pérdida:'
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}

const getCompanyName = (code) => {
  const company = investmentStore.companies.find((c) => c.code === code)
  return company ? company.name : code
}

onMounted(async () => {
  await investmentStore.fetchAssets()
  await investmentStore.fetchCompanies()
  investmentStore.updateStockValues()
})
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
  color: var(--green);
}

.loss {
  color: var(--red);
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