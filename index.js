const express = require('express');
const cors = require('cors'); // 👈 IMPORTANTE

const app = express();
const PORT = 3000;

const palabras = require('./palabras');

// 👇 HABILITAR CORS
app.use(cors({
    origin: 'http://127.0.0.1:5500' // tu frontend
}));
// console.log(palabras);

app.use(express.json());

// GET TODAS LAS PALABRAS / CON ARGUMENTO DE LONGITUD
app.get('/api-palabras/palabras', (req, res) => {
    const { longitud } = req.query;

    if (longitud) {
        const filtradas = palabras.filter(p => p.length == longitud);
        return res.json(filtradas);
    }

    res.json(palabras);
});

app.get('/api-palabras/palabra-random', (req, res) => {
    const { longitud } = req.query;

    if (longitud) {
        const filtradas = palabras.filter(p => p.length == longitud);
        const indexAleatorio = Math.floor(Math.random() * filtradas.length);

        return res.json(filtradas[indexAleatorio]);
    }

    const indexAleatorio = Math.floor(Math.random() * palabras.length);
    res.json(palabras[indexAleatorio]);
});



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
