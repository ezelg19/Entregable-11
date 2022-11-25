const socket = io()

const addArray = e => {
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    socket.emit('newProduct', { title, price, thumbnail })
    return false
}

const addMensaje = e => {
    fecha = new Date().toLocaleDateString()
    hora = new Date().toLocaleTimeString()
    const nombre = document.querySelector('#name').value; const apellido = document.querySelector('#lastName').value; const edad = document.querySelector('#edad').value; const alias = document.querySelector('#alias').value
    const author = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        alias: alias
    }
    const mensaje = document.querySelector('#mensaje').value
    const comentario = {
        hora: hora,
        fecha: fecha,
        mensaje: mensaje
    }

    socket.emit('newMensaje', { author: author, mensaje: comentario })
    return false
}

const render = array => {
    const html = array.map(elem => {
        return (`<tr>
                    <th scope='row' style="text-align:center">${elem.id}</th>
                    <td style="text-align:center">${elem.title}</td>
                    <td style="text-align:center">$ ${elem.price}</td>
                    <td style="text-align:center"><img src=${elem.thumbnail} alt="" border=1 height=30 width=30></img></th>
                </tr>`)
    }).join(" ")
    document.querySelector('#array').innerHTML = html
    document.querySelector('#table').scrollTop = document.querySelector('#table').scrollHeight
}

const rendermsg = archivo => {
    const html = archivo.map(elem => {
        return (`<div>
        <b style='color:blue'>${elem.author.alias}</b></br>
        <a style='color:#B8B8B9'>${elem.mensaje.hora}</a>
        <a>${elem.mensaje.mensaje}</a>
        </div>`)
    }).join(" ")
    document.querySelector('#mensajes').innerHTML = html
    document.querySelector('#chat').scrollTop = document.querySelector('#chat').scrollHeight
}


socket.emit('respuesta')
socket.on('array', data => {
    render(data)
})
socket.on('mensajes', data => {
    rendermsg(data)
})