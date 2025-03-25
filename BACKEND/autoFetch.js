/* eslint-disable no-undef */
import fetch from 'node-fetch';

const apikeys = ["3ed5521e315d4912bd2cd2b15031424e", "c80e6da472ae4cfb97a6724283e183ef", "61ec63e127f349babba338d5057eebc2"];
let currentKeyIndex = 0;

// Usamos memoria en lugar de filesystem (requerido en Vercel)
let cachedData = {};

async function getDataFromApi() {
    try {
        const apiKey = apikeys[currentKeyIndex];
        const urlAPI = `https://api.twelvedata.com/time_series?symbol=AAPL,META,TSLA,NVDA,AMZN,GOOGL,INTC,AMD&interval=1h&apikey=${apiKey}`;

        console.log(`Using API Key: ${apiKey}`);
        const response = await fetch(urlAPI);
        const data = await response.json();

        if (data.code === 429) {
            console.warn("API limit reached - switching to the next API key...");
            currentKeyIndex = (currentKeyIndex + 1) % apikeys.length;
            return getDataFromApi();
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

// Ejecución periódica (cada 1 minuto)
if (process.env.VERCEL !== '1') { // Solo si no estamos en Vercel
    setInterval(getDataFromApi, 60000);
    getDataFromApi(); // Ejecución inicial
}
