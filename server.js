require('dotenv').config()
const express = require('express')
const { Server: HttpServer, request } = require('http')
const { Server: IOServer } = require('socket.io')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const hbs = require('express-handlebars')
const MongoStore = require('connect-mongo')

const test = require('./modulos/routers/routerProductoTest.js')
const { productos } = require('./modulos/class/productos.js')
const mensajes = require('./modulos/class/mensajes.js')
const authors = require('./modulos/class/authors.js')
const routerProd = require('./modulos/routers/routerProductos.js')
const routermsg = require('./modulos/routers/routermsg.js')
const login = require('./modulos/routers/session/routerLogin.js')
const routerSession = require('./modulos/routers/session/routerSession.js')
const routerCookies = require('./modulos/routers/cookies/routerCookies.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.engine('hbs', hbs.engine({
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'server.hbs'
}))

const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SECRET_KEY_COOKIE))
app.use(session({
    secret: process.env.SECRET_KEY_SESSION,
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        mongoOptions: config
    }),
    resave: true,
    saveUninitialized: true
}))

app.set('views', './views')
app.set('view engine', 'hbs')

app.use('/', routerSession)
app.use('/login', login)
app.use('/appi/productos', routerProd)
app.use('/appi/productos-test', test)
app.use('/cookies', routerCookies)
app.use('/mensajes', routermsg)

let users = 0

const PORT = 4000
httpServer.listen(PORT, () => { console.log(`escuchando ${PORT}`) })
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
        await mensajes.save(data.mensaje, data.sid)
        io.sockets.emit('mensajes', await mensajes.getAll())
    })
    socket.on('disconnect', () => { console.log('user disconnected'), users-- })
})