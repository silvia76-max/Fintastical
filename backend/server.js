/* eslint-disable no-undef */
import express from 'express'; // Importa express
import cors from 'cors'; // Importa cors
import { getStockData, getDataFromApi } from './autoFetch.js'; // Importa funciones personalizadas

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Asegura que puedes recibir JSON en el body

// Ruta para obtener los datos
app.get('/api/stocks', async (req, res) => {
    try {
        const data = await getStockData();
        res.json(data);
    } catch (error) {
        console.error("Error obteniendo datos de stocks:", error);
        res.status(500).json({ error: error.message });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Si estamos en Vercel, ejecutamos la función de auto-fetching
    if (process.env.VERCEL === '1') {
        console.log("Fetching initial data for Vercel deployment...");
        getDataFromApi();
    }
});

// Exportar app para Vercel
export default app;
