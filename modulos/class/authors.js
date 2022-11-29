const knex = require('knex')
const { option } = require('../configKnex/config.js')

class Author {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla
        this.crearTable()
    }

    async save(obj) {
        try {
            return await this.knex(this.table).insert(obj)
        }
        catch (error) { console.log({error:error}) }
    }

    async getBySid(sid){
        return await this.knex(this.table).select().where("sid","=",sid).then(data=>data)
    }
    
    // async validar(id, password) {
    //     const pass = await this.knex.from(this.table).select('password').where("ROWID", "=", id).then(data => data)
    //     return pass[0].password === password
    // }

    // async existe(obj) {
    //     const { nombre, apellido, alias } = obj
    //     const na = await this.knex.from(this.table).select('ROWID').where("nombre", "=", nombre).then(data => data)
    //     const ap = await this.knex.from(this.table).select('ROWID').where("apellido", "=", apellido).then(data => data)
    //     const al = await this.knex.from(this.table).select('ROWID').where("alias", "=", alias).then(data => data)
    //     for (let i = 0; i < na.length; i++) {
    //         for (let j = 0; j < ap.length; j++) {
    //             if (na[i].rowid === ap[j].rowid) {
    //                 for (let z = 0; z < al.length; z++) {
    //                     if (na[i].rowid === al[z].rowid) { return al[z] }
    //                 }
    //             }
    //         }
    //     }
    //     return false
    // }

    async update(obj, rowid) {
        await this.knex(this.table).where("ROWID", "=", rowid).update(obj)
    }

    async crearTable() {
        await this.knex.schema.hasTable('authors').then(async (exists) => {
            if (!exists) {
                await this.knex.schema.createTable('authors', table => {
                    table.string('nombre')
                    table.string('apellido')
                    table.string('alias')
                    table.string('sid')
                })
                    .then(() => console.log(`BD creada /${this.table}`))
                    .catch((error) => { console.log(error); throw error })
            }
        })
    }

    dconstructor(nombre, apellido, edad, alias, id = 1) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.id = id
        this.newAuthor()
    }
    newAuthor() {
        this.id++
    }
}

const authors = new Author(option.sqlite, 'authors')


module.exports = authors