const { faker } = require('@faker-js/faker')

faker.locale = 'es'

function generarProducto() {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.food(),
    }
}

module.exports = generarProducto