const { Router } = require('express')
const author = require('../../class/authors.js')
const { authMiddleware } = require('../../middleware/authMidlleware.js')

const router = Router()

router.get('/', authMiddleware,(req, res) => {
    res.render('main', { root: __dirname })
})

router.post('/', async (req, res) => {
    const { nombre, apellido, alias, password } = req.body
    const verificar = await author.existe({ nombre, apellido, alias })
    if (verificar) { if (!await author.validar(verificar.rowid, password)) { return res.send('login failed') } }
    else { 
        req.session.user = alias
        const sid = req.sessionID
        await author.save({ nombre, apellido, alias, password, sid}) }
    req.session.user = alias
    const sid = req.sessionID
    await author.update({ nombre, apellido, alias, password, sid},verificar.rowid)
    // req.session.admin = true
    res.render('main')
})

router.post('/', (req, res) => {

})

router.delete('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.send(error)
        res.send('sesion cerrada')
    })
})

module.exports = router