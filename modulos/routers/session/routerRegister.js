const { Router } = require('express')
const { passport } = require('../../middleware/passport.js')

const router = Router()

router.get('/:existe?', (req, res) => {
    if (req.params.existe) { return res.render('register', { repetido: true }) }
    res.render('register')
})

router.post('/', passport.authenticate('register',{
    successRedirect:'/login',
    failureRedirect:'/register/existe'
}))

module.exports = router