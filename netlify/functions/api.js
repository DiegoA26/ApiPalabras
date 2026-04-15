const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const palabras = require('../../palabras'); // ajusta ruta

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());

// Rutas
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

    const lista = longitud
        ? palabras.filter(p => p.length == longitud)
        : palabras;

    const index = Math.floor(Math.random() * lista.length);
    res.json(lista[index]);
});

// 👇 IMPORTANTE: montas router en root
app.use('/', router);

// export Netlify function
module.exports.handler = serverless(app);
