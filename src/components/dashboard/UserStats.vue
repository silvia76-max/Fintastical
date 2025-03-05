<template>
  <div>
    <h1>Top Exchanges</h1>
    <p v-if="loading"><LoaderComp /></p>
    <p v-if="error" style="color: red;">Error: {{ error }}</p>
    <ul v-if="exchanges.length">
      <li v-for="(exchange, index) in exchanges" :key="index">
        {{ exchange.name }} ({{ exchange.acronym }}) - Country: {{ exchange.country }} - City: {{ exchange.city }}
      </li>
    </ul>
    <p v-if="!loading && !exchanges.length && !error">No data available.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useApi } from '@/composables/useApi.js';
import LoaderComp from '@/components/LoaderComp.vue';

const accessKey = '61ec63e127f349babba338d5057eebc2'; // Replace with your actual access key
const url = `http://api.marketstack.com/v1/exchanges?access_key=${accessKey}`;

// Use the composable
const { data, loading, error, fetchData } = useApi();

// Fetch data on component mount
onMounted(async () => {
  await fetchData(url);
});

// Compute the exchanges list
const exchanges = computed(() => {
  if (data.value && data.value.data) {
    return data.value.data.map((exchange) => ({
      name: exchange.name || 'N/A',
      acronym: exchange.acronym || 'N/A',
      country: exchange.country_code || 'N/A',
      city: exchange.city || 'N/A',
      mic: exchange.mic || 'N/A', // Market Identifier Code
    }));
  }
  return [];
});
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
