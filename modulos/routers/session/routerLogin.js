const { Router } = require('express')
const author = require('../../class/authors.js')

const router = Router()

router.get('/:expiro?', (req, res) => {
    if(req.params.expiro){return res.render('login',{expiro:true})}
    res.cookie('time','1min',{maxAge: 60000}).render('login')
})

router.post('/', async (req, res) => {
    const { nombre, apellido, alias } = req.body
    const autor ={nombre:nombre, apellido:apellido, alias:alias, sid:req.sessionID}
    req.session.user = alias
    req.session.time = new Date().getMinutes()
    const a = await author.getBySid(req.sessionID)
    if(a.leght === 1){await author.update(autor, a[0].rowid)}
    else{await author.save(autor)}
    res.cookie('time','1min',{maxAge: 60000}).redirect('./')
})

module.exports = router