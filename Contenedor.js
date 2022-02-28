const fs = require("fs");

module.exports = class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll(){
        try{
            return await JSON.parse(await fs.promises.readFile(this.fileName, "utf-8"));
        }catch{
            throw new Error(`Hubo un error al leer el archivo: ${err.message}`);
        }
    }

    async save(producto) {
        try {
            let contenido;

            if (fs.existsSync(this.fileName)) {
                contenido = await this.getAll();
                producto.id = contenido[contenido.length - 1].id + 1;
                contenido.push(producto);
            } else {
                producto.id = 1;
                contenido = [producto];
            }

            await fs.promises.writeFile(this.fileName, JSON.stringify(contenido));
            return producto.id;
        } catch (err) {
            throw new Error(`Hubo un error al agregar el producto: ${err.message}`);
        }
    }

    async getById(id) {
        try{
            const resultado = (await this.getAll()).find(p => p.id == id);

            if(!resultado) return null;

            return resultado;
        }catch(err){
            throw new Error(`Hubo un error al encontrar el producto: ${err.message}`);
        }
    }

    async deleteById(id){
        try{
            const nuevoContenido = (await this.getAll()).filter(p => p.id != id);
            await fs.promises.writeFile(this.fileName, JSON.stringify(nuevoContenido));
        }catch(err){
            throw new Error(`Hubo un error al eliminar el producto: ${err.message}`);
        }
    }

    async deleteAll(){
        try{
            await fs.promises.writeFile(this.fileName, '');
        }catch(err){
            throw new Error(`Hubo un error al eliminar los productos: ${err.message}`);
        }
    }
};
