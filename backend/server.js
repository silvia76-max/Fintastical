// server.js

import express from 'express'; // Importa express
import cors from 'cors'; // Importa cors
import { getStockData, getDataFromApi } from './autoFetch.js'; // Importa tus funciones

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS para permitir peticiones desde el frontend
app.use(cors()); 

// Ruta para obtener los datos
app.get('/api/stocks', async (req, res) => {
    try {
        const data = await getStockData(); // Obtén datos de stock
        res.json(data); // Devuelve los datos en formato JSON
    } catch (error) {
        res.status(500).json({ error: error.message }); // Manejo de errores
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Si estamos en Vercel, inicializamos la obtención de datos
    if (process.env.VERCEL === '1') {
        console.log("Fetching initial data for Vercel deployment...");
        getDataFromApi();
    }
});

// Exportación para Vercel (obligatorio)
export default app;
