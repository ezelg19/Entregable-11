const generarProducto = require('../utils/generadorDeProductos.js')
const {Produc}= require('./productos.js')
const { option } = require('../configKnex/config.js')

class ProductoTest extends Produc {
    constructor(config, tabla) {
        super(config, tabla)
    }
    
    popular(cant = 5) {
        const nuevos = []
        for (let i = 1; i <= cant; i++) {
            const nuevoProducto = generarProducto()
            this.save(nuevoProducto)
            nuevos.push(nuevoProducto)
        }
        return nuevos
    }
}

const productosTest = new ProductoTest(option.mysql, 'test')

module.exports = { ProductoTest, productosTest}