const { Router } = require('express')
const author = require('../../class/authors.js')

const router = Router()

router.get('/', (req, res) => {
    res.render('register', { root: __dirname })
})

router.post('/', async(req, res) => {
    const { nombre, apellido, alias, password } = req.body
    await author.save({nombre,apellido,alias,password})
    res.send(author.buscar())
})

module.exports = router