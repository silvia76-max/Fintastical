import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from './auth';

export const useInvestmentStore = defineStore('investments', () => {
  const api = useApi();
  const auth = useAuthStore();
  
  // State
  const assets = ref([]);
  const companies = ref([]);
  const stockValues = ref({});
  
  // Computed
  const totalInvestment = computed(() => {
    return assets.value.reduce((sum, asset) => {
      return sum + (asset.shares * asset.purchase_price);
    }, 0);
  });

  const currentTotalValue = computed(() => {
    return assets.value.reduce((sum, asset) => {
      const currentPrice = stockValues.value[asset.code] || 0;
      return sum + (asset.shares * currentPrice);
    }, 0);
  });

  const totalProfit = computed(() => {
    return currentTotalValue.value - totalInvestment.value;
  });

  const latestInvestment = computed(() => {
    if (!assets.value.length) return null;
    return [...assets.value].sort((a, b) => 
      new Date(b.purchase_date) - new Date(a.purchase_date)
    )[0];
  });

  // Actions
  const fetchAssets = async () => {
    try {
      const userId = auth.user?.id;
      await api.fetchData(`http://localhost:3000/assets?user_id=${userId}`);
      assets.value = api.data.value || [];
    } catch (err) {
      console.error('Error loading assets:', err);
    }
  };

  const fetchCompanies = async () => {
    try {
      await api.fetchData('http://localhost:3000/companies');
      companies.value = api.data.value || [];
    } catch (err) {
      console.error('Error loading companies:', err);
    }
  };

  const getCurrentStockValue = async (code) => {
    try {
      await api.fetchData(`http://localhost:8111/${code}`);
      const price = api.data.value.values[0].close;
      stockValues.value[code] = Number(parseFloat(price).toFixed(2));
    } catch (err) {
      console.error('Error getting current value:', err);
      stockValues.value[code] = null;
    }
  };

  const updateStockValues = () => {
    assets.value.forEach(asset => {
      getCurrentStockValue(asset.code);
    });
  };

  const addAsset = async (newAsset) => {
    try {
      await api.postData('http://localhost:3000/assets', newAsset);
      await fetchAssets();
      updateStockValues();
    } catch (err) {
      console.error('Error adding asset:', err);
      throw err;
    }
  };

  const deleteAsset = async (id) => {
    try {
      await api.deleteData(`http://localhost:3000/assets/${id}`);
      await fetchAssets();
      updateStockValues();
    } catch (err) {
      console.error('Error deleting asset:', err);
      throw err;
    }
  };

  return {
    // State
    assets,
    companies,
    stockValues,
    
    // Computed
    totalInvestment,
    currentTotalValue,
    totalProfit,
    latestInvestment,
    
    // Actions
    fetchAssets,
    fetchCompanies,
    getCurrentStockValue,
    updateStockValues,
    addAsset,
    deleteAsset
  };
});