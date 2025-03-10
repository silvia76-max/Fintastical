import { ref } from 'vue';

export function useAAFetch() {
  const data = ref(null);
  const error = ref(null);

  const pullData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error loading data');
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err.message || 'An error occurred';
      console.error(error.value);
    }
  };

  return {
    data,
    error,
    pullData
  };
}
