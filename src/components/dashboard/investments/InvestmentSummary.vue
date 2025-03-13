<template>
  <div class="investment-summary">
    <h1>Hi, {{ userName }}</h1>

    <!-- assets section header -->
    <div class="summary-card user-info">
      <h2>Overview</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Total Investment</span>
          <span class="stat-value">${{ investmentStore.totalInvestment.toFixed(2) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Current Value</span>
          <span class="stat-value">${{ investmentStore.currentTotalValue.toFixed(2) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label" :class="investmentStore.totalProfit >= 0 ? 'profit' : 'loss'">
            {{ investmentStore.totalProfit >= 0 ? 'Total Profit' : 'Total Loss' }}
          </span>
          <span class="stat-value" :class="investmentStore.totalProfit >= 0 ? 'profit' : 'loss'">
            ${{ Math.abs(investmentStore.totalProfit).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>

    <!-- last investment section -->
    <div v-if="latestInvestment" class="summary-card latest-investment">
      <h2>Last Investment</h2>
      <div class="latest-investment-details">
        <div class="company-info">
          <span class="company-code">{{ latestInvestment.code }}</span>
          <span class="company-name">{{ getCompanyName(latestInvestment.code) }}</span>
        </div>
        <table class="desktop-table">
          <thead>
            <tr>
              <th>Shares</th>
              <th>Price per Share</th>
              <th>Total Investment</th>
              <th>Date</th>
              <th>Current Value</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ latestInvestment.shares }}</td>
              <td>${{ latestInvestment.purchase_price }}</td>
              <td>${{ (latestInvestment.shares * latestInvestment.purchase_price).toFixed(2) }}</td>
              <td>{{ formatDate(latestInvestment.purchase_date) }}</td>
              <td>${{ investmentStore.stockValues[latestInvestment.code] || 'Loading...' }}</td>
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

// computed property for username, defaulting to 'usuario' if undefined
const userName = computed(() => auth.user?.name || 'usuario')

// computed property for the latest investment, taking the last element of the assets array
const latestInvestment = computed(() => {
  return investmentStore.assets.length > 0
    ? investmentStore.assets[investmentStore.assets.length - 1]
    : null
})

// computed property for calculating the profit or loss of the latest investment
const latestProfit = computed(() => {
  if (!latestInvestment.value) return 0
  const currentPrice = investmentStore.stockValues[latestInvestment.value.code] || 0
  return (currentPrice - latestInvestment.value.purchase_price) * latestInvestment.value.shares
})

// computed property to determine the css class based on profit or loss
// if profit, returns 'profit' (which will apply var(--green)); if loss, returns 'loss' (applies var(--red))
const getLatestProfitClass = computed(() => {
  return latestProfit.value >= 0 ? 'profit' : 'loss'
})

// computed property for the profit indicator text
const getLatestProfitIndicator = computed(() => {
  return latestProfit.value >= 0 ? '✅ Profit:' : '🔻 Loss:'
})

// function to format date using spanish locale
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}

// function to retrieve company name from the companies array in the store
const getCompanyName = (code) => {
  const company = investmentStore.companies.find(c => c.code === code)
  return company ? company.name : code
}

// on mounted, fetch assets, companies and update stock values to refresh the latest data
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

h2 {
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
  font-size: 2rem;
  color: var(--purple-dark);
}

.stat-value {
  font-size: 2rem;
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

.profit {
  color: var(--green);
}

.loss {
  color: var(--red);
}

.desktop-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 16px;
  border: 1px solid var(--purple-light);
  border-radius: 16px;
  overflow: hidden;
  font-size: 2rem;
}

.desktop-table thead {
  background: var(--purple-light);
  color: var(--purple);
}

.desktop-table th,
.desktop-table td {
  padding: 12px;
  text-align: center;
  font-size: 2rem;
}

.desktop-table tbody td {
  color: var(--purple-dark);
}
</style>
