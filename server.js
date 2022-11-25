const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const dotenv = require('dotenv')
const hbs = require('express-handlebars')
const knex = require('knex')

const test = require('./modulos/routers/routerProductoTest.js')
const { productos } = require('./modulos/class/productos.js')
// const { option } = require('./modulos/configKnex/config.js')
const mensajes = require('./modulos/class/mensajes.js')
const routerProd = require('./modulos/routers/routerProductos.js')
const routerSession = require('./src/routers/session/routerSession.js')
const routerCookies = require('./src/routers/cookies/routerCookies.js')


// const productos = new Produc(option.mysql, 'productos')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'server.hbs'
}))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(session({
//     secret: process.env.SECRET_KEY_SESSION,
//     resave: true,
//     saveUninitialized: true
// }))

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/productos', routerProd)
app.use('/appi/productos-test', test)
app.use('/cookies', routerCookies)
app.use('/session', routerSession)

app.get('/', (req, res) => {
    res.render('login', { root: __dirname })
})

let users = 0

const PORT = 4000
httpServer.listen(PORT, () => { console.log(`escuchando ${PORT}`) })
// httpServer.listen(process.env.PORT || 8080, () => console.log(`escuchando ${PORT}`))
io.on('connection', async (socket) => {
    users++
    console.log(`usuario ${socket.id} conectado. N°:${users}`)
    socket.on('respuesta', async () => {
        io.sockets.emit('array', await productos.getAll())
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
    socket.on('newProduct', async data => {
        productos.save(data)
        io.sockets.emit('array', await productos.getAll())
    })
    socket.on('newMensaje', async data => {
        await mensajes.save(data)
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
    socket.on('disconnect', () => { console.log('user disconnected'), users-- })
})