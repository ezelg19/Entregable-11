const knex = require('knex')
const { option } = require('../configKnex/config.js')

class Produc {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla
        this.crearTable()
    }

    async save(obj) {
        try {
            return await this.knex(this.table).insert(obj)
        } catch (error) {
            console.log(error)
        }
    }
    async actualizar(obj) {
        try {
            return await this.knex.from(this.table).where('id', '=', obj.id).update(obj)
        } catch (error) {
            console.log('error?', error)
        }
    }
    async getById(id) {
        try {
            return await this.knex.from(this.table).select('*').where('id', '=', parseInt(id))
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            return await this.knex.from(this.table).select('*')
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteById(id) {
        try {
            return await this.knex.from(this.table).where('id', '=', parseInt(id)).del()
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteAll() {
        try {
            return await this.knex.from(this.table).select('*').del()
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }
    async crearTable() {
        await this.knex.schema.hasTable(this.table).then(async (exists) => {
            if (!exists) {
                await this.knex.schema.createTable(this.table, table => {
                    table.increments('id')
                    table.string('title')
                    table.integer('price')
                    table.string('thumbnail')
                })
                    .then(() => console.log(`BD creada /${this.table}`))
                    .catch((error) => { console.log(error); throw error })
            }
        })
    }
}

const productos = new Produc(option.mysql, 'productos')

module.exports = { Produc, productos }