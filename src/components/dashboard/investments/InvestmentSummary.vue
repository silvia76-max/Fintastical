<template>
  <div class="investment-summary">
    <h1>Overview</h1>
    <div class="profile-data">
      <p>Hello {{ user.name }}!</p>
      <ul>
        <li>{{ user.email }}</li>
        <li>User ID: {{ user.id }}</li>
      </ul>
      <router-link to="/investments" class="investments-link">
      My investments
    </router-link>
    <router-link to="auth/profile" class="investments-link-last">
      My profile
    </router-link>
    </div>

    <!-- User info -->
    <div class="summary-card user-info">
      <h2>Hi, {{ userName }}</h2>
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

    <!-- Last investment section -->
    <div v-if="latestInvestment" class="summary-card latest-investment">
      <h3>Last Investment</h3>
      <div class="latest-investment-details">
        <div class="company-info">
          <span class="company-code">{{ latestInvestment.code }}</span>
          <span class="company-name">{{ getCompanyName(latestInvestment.code) }}</span>
        </div>
        <!-- Desktop Table -->
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

        <!-- Responsive Table -->
        <table class="responsive-table">
          <tbody>
            <!-- Fila 1: primeros 3 encabezados -->
            <tr>
              <th>Shares</th>
              <th>Price per Share</th>
              <th>Total Investment</th>
            </tr>
            <!-- Fila 2: datos correspondientes -->
            <tr>
              <td>{{ latestInvestment.shares }}</td>
              <td>${{ latestInvestment.purchase_price }}</td>
              <td>${{ (latestInvestment.shares * latestInvestment.purchase_price).toFixed(2) }}</td>
            </tr>
            <!-- Fila 3: siguientes 3 encabezados -->
            <tr>
              <th>Date</th>
              <th>Current Value</th>
              <th>Status</th>
            </tr>
            <!-- Fila 4: datos correspondientes -->
            <tr>
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

const auth = useAuthStore();
const investmentStore = useInvestmentStore();
const user = computed(() => auth.user);

const userName = computed(() => auth.user?.name || 'User')

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
  return latestProfit.value >= 0 ? '✅ Profit:' : '🔻 Loss:'
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

.profile-data {
  position: absolute;
  background: var(--purple-light);
  padding: 3rem;
  border-radius: 0px 20px 80px 0;
  margin-bottom: 30px;
  top: 140px;
  left: 0;
  width: 23rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.profile-data::before {
  content: '\f007';
  font-family: 'Font Awesome 5 Free';
  font-weight: 100;
  transform: translateX(-50%);
  margin-right: 10px;
  vertical-align: middle;
  position: relative;
  top: 0;
  left: 50%;
  font-size: 4rem;
  color: inherit;
  display: inline-flex;
  border-radius: 56%;
  border: 2px solid var(--purple-dark);
  width: 8rem;
  height: 8rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem ;
}

.profile-data p{
  font-size: 2rem;
}

.profile-data ul {
  margin: 2rem 0;
}

.profile-data ul li {
  font-family: "InstrumentSans", sans-serif;
  font-size: 1.3rem;
}

.investment-summary {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}


.investments-link {
  display: block;
  margin-top: 1rem;
  background-color: var(--purple-light);
  color: var(--purple);
  border: 2px solid var(--purple);
  padding: 1rem 2rem;
  border-radius: 1rem 1rem 1rem 0;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}

.investments-link:hover {
  background-color: var(--purple);
  color: var(--purple-light);
  border-radius: 1rem 1rem 1rem 0;
  border: 2px solid var(--purple);
  transform: scale(1.1);
}

.investments-link-last {
  display: block;
  margin-top: 1rem;
  background-color: var(--purple-light);
  color: var(--purple);
  border: 2px solid var(--purple);
  padding: 1rem 2rem;
  border-radius: 1rem 1rem 5rem 0;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
}

.investments-link-last:hover {
  background-color: var(--purple);
  color: var(--purple-light);
  border-radius: 1rem 1rem 5rem 0;
  border: 2px solid var(--purple);
  transform: scale(1.1);
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


.responsive-table {
  display: none;
}

@media (max-width: 1024px) {
  .desktop-table {
    display: none;
  }
  .responsive-table {
    display: table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin-top: 16px;
    border: 1px solid var(--purple-light);
    border-radius: 16px;
    overflow: hidden;
    font-size: 2rem;
  }
  .responsive-table th,
  .responsive-table td {
    padding: 12px;
    text-align: center;
    font-size: 2rem;
  }

  .responsive-table tbody tr:nth-child(1),
  .responsive-table tbody tr:nth-child(3) {
    background: var(--purple-light);
    color: var(--purple);
  }

  .responsive-table tbody tr:nth-child(2),
  .responsive-table tbody tr:nth-child(4) {
    color: var(--purple-dark);
  }
}

@media (max-width: 768px) {
  .responsive-table th,
  .responsive-table td {
    padding: 8px;
  }
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .responsive-table th,
  .responsive-table td {
    padding: 6px;
  }
}
</style>
