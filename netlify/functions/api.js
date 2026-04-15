const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const palabras = require('../../palabras'); // Ajusta la ruta si es necesario

const app = express();
const router = express.Router();

app.use(cors()); // En producción puedes dejarlo abierto o limitar a tu dominio de Netlify
app.use(express.json());

// Definimos las rutas dentro del router
router.get('/palabras', (req, res) => {
    const { longitud } = req.query;
    if (longitud) {
        const filtradas = palabras.filter(p => p.length == longitud);
        return res.json(filtradas);
    }
    res.json(palabras);
});

router.get('/palabra-random', (req, res) => {
    const { longitud } = req.query;
    if (longitud) {
        const filtradas = palabras.filter(p => p.length == longitud);
        const indexAleatorio = Math.floor(Math.random() * filtradas.length);
        return res.json(filtradas[indexAleatorio]);
    }
    const indexAleatorio = Math.floor(Math.random() * palabras.length);
    res.json(palabras[indexAleatorio]);
});

// Importante: El path base en Netlify Functions suele ser /.netlify/functions/api
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
