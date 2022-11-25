// const knex = require('knex')
// const { option } = require('../configKnex/config.js')

// class Mensajes {
//     constructor(config, tabla) {
//         this.knex = knex(config)
//         this.table = tabla
//         this.crearTable()
//     }

//     async save(obj) {
//         try {
//             return await this.knex(this.table).insert(obj)
//         }
//         catch (error) { console.log(error) }
//     }

//     async getAll() {
//         try {
//             const array =  await this.knex.from(this.table).select('*')
//             return array
//         }
//         catch (error) { console.log(error) }
//     }

//     async crearTable() {
//         await this.knex.schema.hasTable('mensajes').then(async (exists) => {
//             if (!exists) {
//                 await this.knex.schema.createTable('mensajes', table => {
//                     table.date('fecha')
//                     table.date("hora")
//                     table.string('mensaje')
//                     table.json('author')
//                 })
//                     .then(() => console.log('BD creada'))
//                     .catch((error) => { console.log(error); throw error })
//             }
//         })
//     }
// }
const fs = require('fs')

class Mensajes {
    constructor(ruta, id = 1) {
        this.ruta = ruta
        this.id = id
    }

    async save(obj) {
        try {
            const contArchivo = await this.getAll()
            if (contArchivo.length !== 0) {
                this.id++
                await fs.promises.writeFile(this.ruta, JSON.stringify([...contArchivo, { ...obj, id: this.id }], null, 2), 'utf-8')
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: this.id }]), 'utf-8')
            }
            return this.id
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            let contParse = await JSON.parse(contenido)
            if (contParse.length !== 0) { contParse.map(elem => { if (elem.id > this.id) { this.id = elem.id } }) }
            return contParse
        }
        catch (error) {
            console.log(error)
        }
    }
}

const mensajes = new Mensajes('./modulos/utils/mensajes.json')

module.exports = mensajes