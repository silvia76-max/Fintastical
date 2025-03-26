/* eslint-disable no-undef */
import fetch from 'node-fetch';

const apikeys = [process.env.API_KEY_1, process.env.API_KEY_2, process.env.API_KEY_3];
let currentKeyIndex = 0;

// Usamos memoria en lugar de filesystem (requerido en Vercel)
let cachedData = {};

async function getDataFromApi() {
    try {
        const apiKey = apikeys[currentKeyIndex];
        const urlAPI = `https://api.twelvedata.com/time_series?symbol=AAPL,META,TSLA,NVDA,AMZN,GOOGL,INTC,AMD&interval=1h&apikey=${apiKey}`;

        console.log(`Using API Key: ${apiKey}`);
        const response = await fetch(urlAPI);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data.code === 429) {
            console.warn("API limit reached - switching to the next API key...");
            currentKeyIndex = (currentKeyIndex + 1) % apikeys.length;
            return getDataFromApi();
        }

        if (!data || !data.values) {
            console.error("Invalid data format received from API");
            return cachedData;
        }

        // Actualizamos la caché en memoria
        cachedData = data;
        console.log(`[${new Date().toISOString()}] Data updated in memory`);

        return data;
    } catch (error) {
        console.error(`Error getting data:`, error);
        return cachedData; // Devuelve datos antiguos si hay error
    }
}

// Exportamos para usar en server.js
export async function getStockData() {
    return cachedData;
}

// Ejecución periódica (solo si no estamos en Vercel)
if (process.env.VERCEL !== '1') { 
    setInterval(getDataFromApi, 60000); // Ejecuta cada minuto
    getDataFromApi(); // Ejecución inicial
}
