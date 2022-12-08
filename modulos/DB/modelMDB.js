const { Schema, model } = require("mongoose")

const schema = new Schema({
    nombre: { type: String, max: 100, required: true },
    apellido: { type: String, max: 100, required: true },
    username: { type: String, max: 2000 },
    password: { type: String, max: 99999 }
})

module.exports = model('author', schema)
