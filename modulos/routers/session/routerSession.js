const { Router } = require('express')
const { sessionExpirada } = require('../../middleware/authMidlleware.js')

const router = Router()

router.get('/',sessionExpirada, (req, res) => {
    res.cookie('user',req.session.user)
    res.cookie('time','1min',{maxAge: 60000}).render('main', { root: __dirname })
})

router.get('/contador',(req,res)=>{
    if(req.session.contador){
        req.session.contador++
        res.cookie('time','1min',{maxAge: 60000}).send(`sessiones ${req.session.contador}`)
    }
    else{res.cookie('time','1min',{maxAge: 60000}).send('Inicie session')}
})

router.post('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) return res.send(error)
    })
    res.redirect('/')
})

module.exports = router