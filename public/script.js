const ul = document.querySelector('#mensajes');
const textarea = document.querySelector('#mensaje');
const form = document.querySelector('form');

const socket = io();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const mensaje = textarea.value;

    console.log(mensaje);
    // Enviamos un mensaje
    socket.emit('mensaje', mensaje)
})

socket.on('mensajes', (data) => {
    console.log(data);
})