const express = require('express');
const app = express();
const contenedor = require('./iniciarArchivo');
const PORT = 8080;
let nuevoArchivo;

app.get('/productos', async(req,res) => {
    const productos = await nuevoArchivo.getAll();
    res.send(productos);
});

app.get('/productoRandom', async(req,res) => {
    const productos = await nuevoArchivo.getAll();
    const random = productos[Math.floor(Math.random() * productos.length)];
    res.send(random);
});

const iniciarServidor = async() => {
    nuevoArchivo = await contenedor();
    const server = app.listen(PORT, () => {
        console.log('Connected to port 8080...');
    });
    server.on('error', error => console.log('Hubo un error: ', error));
}
iniciarServidor();