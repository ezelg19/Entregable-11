const knex = require('knex')
const { option } = require('../configKnex/config.js')

const mongoose = require('mongoose')
const model = require('../DB/modelMDB.js')

// class Author {
//     constructor(config, tabla) {
//         this.knex = knex(config)
//         this.table = tabla
//         this.crearTable()
//     }

//     async save(obj) {
//         try {
//             await this.knex(this.table).insert(obj)
//             const a = await this.knex.from(this.table).select('ROWID').where("username", "=", obj.username).then(data => data)
//             return a
//         }
//         catch (error) { console.log({error:error}) }
//     }

//     async getBySid(sid){
//         return await this.knex(this.table).select().where("sid","=",sid).then(data=>data)
//     }

//     async getByUser(user){
//         return await this.knex(this.table).select().where("username","=",user).then(data=>data)
//     }

//     async verificar(id) {
//         const pass = await this.knex.from(this.table).select('username').where("ROWID", "=", id).then(data => data)
//         return pass
//     }

//     async update(obj, rowid) {
//         await this.knex(this.table).where("ROWID", "=", rowid).update(obj)
//     }

//     async crearTable() {
//         await this.knex.schema.hasTable('authors').then(async (exists) => {
//             if (!exists) {
//                 await this.knex.schema.createTable('authors', table => {
//                     table.string('nombre')
//                     table.string('apellido')
//                     table.string('username')
//                     table.string('password')
//                     table.string('sid')
//                 })
//                     .then(() => console.log(`BD creada /${this.table}`))
//                     .catch((error) => { console.log(error); throw error })
//             }
//         })
//     }

//     // dconstructor(nombre, apellido, edad, alias, id = 1) {
//     //     this.nombre = nombre
//     //     this.apellido = apellido
//     //     this.edad = edad
//     //     this.alias = alias
//     //     this.id = id
//     //     this.newAuthor()
//     // }
//     // newAuthor() {
//     //     this.id++
//     // }
// }

// const authors = new Author(option.sqlite, 'authors')


// // module.exports = authors




class Authors {

    constructor() {
        this.ID_FIELD = "_id"
        this.connect()
    }

    async connect() {
        try {
            const URL = 'mongodb://localhost:27017/authors'
            const rta = await mongoose.connect(URL, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            })
            console.log('Base de Datos Mongo conectada')
        } catch (error) {
            console.log('Error al conectarse a la Base de Datos en Mongo', error)
        }
    }

    async save(obj) {
        try {
            const author = new model(obj)
            const guardado = await author.save()
            return guardado
        } catch (error) {
            return { descripcion: 'authors.save()', error: error }
        }
    }

    async actualizar(obj) {
        try {
            let update = await model.updateOne({ [this.ID_FIELD]: obj.id }, { $set: obj })
            return update
        } catch (error) {
            return { descripcion: 'authors.actualizar()', error: error }
        }
    }


    async getByUser(username) {
        try {
            const user = await model.findOne({ user: username })
            return user;
        } catch (error) {
            return { descripcion: 'authors.getByUser()', error: error }
        }
    }
    async verificar(id) {
        try {
            const pass = await this.knex.from(this.table).select('username').where("ROWID", "=", id).then(data => data)
            return pass
        } catch (error) {
            return { descripcion: 'authors.verificar()', error: error }
        }
    }
}

const authors = new Authors()

module.exports = { authors }