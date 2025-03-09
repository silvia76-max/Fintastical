import fs from 'fs';

const urlAPI = 'https://api.twelvedata.com/time_series?symbol=AAPL,META,TSLA,NVDA,AMZN,GOOGL,INTC,AMD&interval=1h&apikey=51e94bef2fd14f9ea1fc59727093f250'; // 
const filePath = 'apiStock.json';

async function getDataFromApi() {
    try {
        const response = await fetch(urlAPI);
        if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);
        
        const data = await response.json();
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        
        console.log(`[${new Date().toISOString()}] Datos guardados en ${filePath}`);
    } catch (error) {
        console.error(`Error al obtener datos:`, error);
    }
}

// every 1 minute
setInterval(getDataFromApi, 60000);

// Execute script 
getDataFromApi();
