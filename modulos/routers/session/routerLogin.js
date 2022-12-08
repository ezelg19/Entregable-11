const { Router } = require('express')
const { passport } = require('../../middleware/passport.js')

const router = Router()

router.get('/:expiro?', (req, res) => {
    if (req.params.expiro) { return res.render('login', { expiro: true }) }
    if (req.query.iniciar) { return res.render('login', { iniciar: true }) }
    res.render('login')
})

router.post('/', passport.authenticate('login', {
    failureRedirect: '/register'
}),
    (req, res) => {
        req.session.user = req.body.username
        req.session.time = new Date().getMinutes()
        res.cookie('time', '1min', { maxAge: 60000 }).redirect('./')
    }
)

module.exports = router