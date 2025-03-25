/* eslint-disable no-undef */
import express from 'express';
import { getStockData } from './autoFetch.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Ruta para obtener los datos
app.get('/api/stocks', async (req, res) => {
    try {
        const data = await getStockData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    if (process.env.VERCEL === '1') {
        getDataFromApi(); // Inicia el fetch en Vercel
    }
});

export default app;
