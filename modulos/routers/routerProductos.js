const { Router } = require('express')
const { productos } = require('../class/productos.js')
const { sessionExpirada } = require('../middleware/authMidlleware.js')
// const { option } = require('../configKnex/config.js')

// const productos = new Produc(option.mysql, 'productos')

const router = Router()

router.get('/',sessionExpirada, async (req, res) => {
    res.cookie('time','1min',{maxAge: 60000}).render('lista', {
        productsExist: await productos.getAll().length,
        products: await productos.getAll()
    })
})

router.post("/",sessionExpirada, async (req, res) => {
    try {
        const { nombre, precio } = req.body
        await productos.save({ nombre: nombre, precio: precio })
        res.cookie('time','1min',{maxAge: 60000}).status(201).redirect('./')
    }
    catch (error) { res.cookie('time','1min',{maxAge: 60000}).status(400).send({ msg: "Error al cargar el producto", err: error }) }
})

router.get("/:id",sessionExpirada, async (req, res) => {
    const { id } = req.params
    res.cookie('time','1min',{maxAge: 60000}).render('producto', {
        productsExist: await productos.getById(parseInt(id)),
        products: await productos.getById(parseInt(id))
    })
})

router.put("/:id",sessionExpirada, async (req, res) => {
    const { id } = req.params
    const guardado = { title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail, id: parseInt(id) }
    await productos.actualizar(guardado)
})

router.delete("/:id",sessionExpirada, async (req, res) => {
    const { id } = req.params
    await productos.deleteById(parseInt(id))
})

module.exports = router