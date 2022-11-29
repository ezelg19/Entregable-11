const socket = io()

const login = e => {
    const user = document.querySelector('#user').value
    const password = document.querySelector('#password').value
    socket.emit('login', { user, password })
    return false
}




const addArray = e => {
    const title = document.querySelector('#title').value
    const price = document.querySelector('#price').value
    const thumbnail = document.querySelector('#thumbnail').value
    socket.emit('newProduct', { title, price, thumbnail })
    return false
}

const mensajes = e=>{  socket.emit('newMensaje')}

const addMensaje = e => {
    fecha = new Date().toLocaleDateString()
    hora = new Date().toLocaleTimeString()

    const mensaje = document.querySelector('#mensaje').value
    const comentario = {
        hora: hora,
        fecha: fecha,
        mensaje: mensaje
    }
    socket.emit('newMensaje', { mensaje: comentario, sid:document.cookie.replace(/(?:(?:^|.*;\s*)sid\s*\=\s*([^;]*).*$)|^.*$/, "$1")})
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
        const author = JSON.parse(elem.author)
        const mensaje = JSON.parse(elem.mensaje)
        console.log(elem.author)
        return (`<div>
        <b style='color:blue'>${author.alias}</b></br>
        <a style='color:#B8B8B9'>${mensaje.hora}</a>
        <a>${mensaje.mensaje}</a>
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