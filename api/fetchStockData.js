/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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

// Esta es la función handler que Vercel ejecutará cuando la API se invoque
export default async function handler(req, res) {
    try {
        const data = await getDataFromApi();
        res.status(200).json(data);  // Devolver los datos a la app frontend
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
}
