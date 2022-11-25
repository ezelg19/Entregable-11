const { Router } = require('express')

const router = Router()

router.get('/',(req, res)=>{
    res.send('<h1>Hola</h1>')
})

router.post('/login', (req, res) => {
    const { username, password } = req.query
    if (username !== 'pepe' || password !== 'pepepass') {return res.send('login failed')}
    req.session.user = username
    req.session.admin = true
    res.send('login success!')
})

router.post('/',(req, res)=>{

})

router.delete('/logout',(req, res)=>{
    req.session.destroy(error=>{
        if(error) return res.send(error)
        res.send('sesion cerrada')
    })
})

module.exports = router