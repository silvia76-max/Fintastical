<template>
    <div class="investment-detail">
      <h2>Add Investment Asset</h2>
      <form @submit.prevent="saveInvestment">
        <!-- Asset Selection with Autocomplete -->
        <label for="asset">Select Asset</label>
        <input
          type="text"
          id="asset"
          v-model="assetQuery"
          placeholder="Type to search..."
        />
        <ul v-if="filteredAssets.length">
          <li v-for="company in filteredAssets" :key="company.code" @click="selectAsset(company)">
            {{ company.name }} ({{ company.code }})
          </li>
        </ul>
        
        <!-- Market (Auto-filled) -->
        <label for="market">Market</label>
        <input type="text" id="market" v-model="selectedMarket" readonly />
        
        <!-- Invested Amount -->
        <label for="investedAmount">Invested Amount</label>
        <input type="number" id="investedAmount" v-model.number="investedAmount" required />
        
        <!-- Purchase Price -->
        <label for="purchasePrice">Purchase Price</label>
        <input type="number" id="purchasePrice" v-model.number="purchasePrice" required />
        
        <!-- Price Crossing Alerts -->
        <label for="priceUp">Price Crossing Up</label>
        <input type="number" id="priceUp" v-model.number="priceCrossingUp" />
        
        <label for="priceDown">Price Crossing Down</label>
        <input type="number" id="priceDown" v-model.number="priceCrossingDown" />
        
        <!-- Save Button -->
        <button type="submit">Save</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  
  const assetQuery = ref('');
  const selectedMarket = ref('');
  const investedAmount = ref(null);
  const purchasePrice = ref(null);
  const priceCrossingUp = ref(null);
  const priceCrossingDown = ref(null);
  const companies = ref([]);
  
  // Fetch companies from backend
  onMounted(async () => {
    try {
      const response = await axios.get('/BACKEND/db.json');
      companies.value = response.data.companies || [];
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  });
  
  // Computed property for filtering assets
  const filteredAssets = computed(() => {
    return assetQuery.value
      ? companies.value.filter(company =>
          company.name.toLowerCase().includes(assetQuery.value.toLowerCase())
        )
      : [];
  });
  
  // Select asset and auto-fill market
  const selectAsset = (company) => {
    assetQuery.value = company.name;
    selectedMarket.value = company.market;
  };
  
  // Save investment
  const saveInvestment = async () => {
    const newInvestment = {
      asset: assetQuery.value,
      market: selectedMarket.value,
      investedAmount: investedAmount.value,
      purchasePrice: purchasePrice.value,
      priceCrossingUp: priceCrossingUp.value,
      priceCrossingDown: priceCrossingDown.value
    };
  
    try {
      await axios.post('/BACKEND/db.json', newInvestment);
      alert('Investment saved!');
    } catch (error) {
      console.error('Error saving investment:', error);
    }
  };
  </script>
  
  <style scoped>
  .investment-detail {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f9f9f9;
  }
  label {
    display: block;
    margin-top: 10px;
  }
  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 5px 0;
    background: white;
    border: 1px solid #ddd;
  }
  li {
    padding: 5px;
    cursor: pointer;
  }
  li:hover {
    background: #eee;
  }
  button {
    width: 100%;
    padding: 10px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    margin-top: 10px;
    cursor: pointer;
  }
  button:hover {
    background: #218838;
  }
  </style>