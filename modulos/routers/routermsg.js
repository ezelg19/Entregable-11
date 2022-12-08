const { Router } = require('express')
const mensajes = require('../class/mensajes.js')
const authors = require('../class/authors.js')
const { checkAuthentication } = require('../middleware/checkAuthentication.js')

const router = Router()

router.post('/', checkAuthentication, async (req, res) => {
    console.log('routermsg')
    fecha = new Date().toLocaleDateString()
    hora = new Date().toLocaleTimeString()
    const mensaje = req.body.mensaje
    const comentario = {
        hora: hora,
        fecha: fecha,
        mensaje: mensaje
    }
    const author = await authors.getBySid(req.sessionID)
    await mensajes.save({ author: author[0], mensaje: comentario })
    res.cookie('time', '1min', { maxAge: 60000 }).redirect('./')
})


module.exports = router
