const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    const { cookies } = req
    res.json({ cookies })
})

router.post('/', (req, res) => {
    res.cookie('nombre', 'aa', { maxAge: 10000 })
})

router.delete('/',(req,res)=>{
    res.clearCookie('nombre')
})


module.exports = router