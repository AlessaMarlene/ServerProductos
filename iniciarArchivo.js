const Contenedor = require('./Contenedor');
const prod1 = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail:'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
};
const prod2 = {
    title: 'Calculadora',
    price: 234.56,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
};
const prod3 = {
    title: 'Globo terraqueo',
    price: 345.67,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
};
const contenedor = new Contenedor('./productos.txt');

module.exports = async function guardarProducto(){
    if(!contenedor.fileExists()){
        await contenedor.save(prod1);
        await contenedor.save(prod2);
        await contenedor.save(prod3);
    }

    return contenedor;
}