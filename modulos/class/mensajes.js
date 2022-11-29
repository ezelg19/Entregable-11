const knex = require('knex')
const { option } = require('../configKnex/config.js')
const authors = require('./authors')

class Mensajes {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla
        this.crearTable()
    }

    async save(obj, sid) {
        try {
            const author = await authors.getBySid(sid)
            return await this.knex(this.table).insert({author:author[0],mensaje:obj})
        }
        catch (error) { console.log(error) }
    }

    async getAll() {
        try {
            const array =  await this.knex.from(this.table).select('*')
            return array
        }
        catch (error) { console.log(error) }
    }

    async crearTable() {
        await this.knex.schema.hasTable('mensajes').then(async (exists) => {
            if (!exists) {
                await this.knex.schema.createTable('mensajes', table => {
                    table.json('author')
                    table.json('mensaje')
                })
                    .then(() => console.log(`BD creada /${this.table}`))
                    .catch((error) => { console.log(error); throw error })
            }
        })
    }
}

const mensajes = new Mensajes(option.sqlite,'mensajes')


module.exports = mensajes