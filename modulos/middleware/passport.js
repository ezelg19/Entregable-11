const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')
const {authors} = require('../class/authors.js')


function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null
    )
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password)
}

passport.use('login', new LocalStrategy(
    async(username, password, done) => {
        //verificar usuario
        let user = await authors.getByUser(username)
        if (!user) {
            console.log('Usuario no registrado')
            return done(null, false)
        }

        return done(null, username)
    }))

passport.use('register', new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {

        //verificar si existe el usuario
        let user = await authors.getByUser(username)
        if (user) {
            console.log('El usuario ya existe')
            return done(null, false, { mensaje: 'El usuario ya existe' })
        }

        //registrar ususario
        const newUser = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            username: username,
            password: createHash(password)
        }

        //guardar usuario
        const id= await authors.save(newUser)
        
        return done(null, id)

    }))

passport.serializeUser((id, done) => {
    done(null, id)
})

passport.deserializeUser(async(id, done) => {
    let user = await authors.getByUser(id)
    done(null, user)
})

module.exports = { passport }