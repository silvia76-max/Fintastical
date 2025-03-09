import fs from 'fs';

const apikeys = ["51e94bef2fd14f9ea1fc59727093f250","2b69e37d583e41fda6a423e2b07cfdb2","61ec63e127f349babba338d5057eebc2"];
let currentKeyIndex = 0;
const filePath = 'BACKEND/apiStock.json';

async function getDataFromApi() {
    try {
        let apiKey = apikeys[currentKeyIndex];
        let urlAPI = `https://api.twelvedata.com/time_series?symbol=AAPL,META,TSLA,NVDA,AMZN,GOOGL,INTC,AMD&interval=1h&apikey=${apiKey}`;
        
        console.log(`Usando API Key: ${apiKey}`);
        const response = await fetch(urlAPI);
        const data = await response.json();

        // if the api returns error 429 (credit limit) we try the following API key
        if (data.code === 429) {
            console.warn("Límite de API alcanzado, cambiando a la siguiente API key...");
            currentKeyIndex = (currentKeyIndex + 1) % apikeys.length;
            // call again with the next apikey
            return getDataFromApi(); 
        }
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { flag: 'w' });
        console.log(`[${new Date().toISOString()}] Datos guardados en ${filePath}`);
    } catch (error) {
        console.error(`Error al obtener datos:`, error);
    }
}

// run every 1 minute
setInterval(getDataFromApi, 60000);

// run immediately at startup
getDataFromApi();
