import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

const io = new Server( server );

app.use( cors());
app.use( express.json())
app.use( express.static('public'));

const mensajes = [
    "Hola",
    "¿Cómo estás?",
    "Bien"
]
let i = 0;

app.get('/mensajes', (request, response) => {    
    i++
    console.log('Enviando mensajes ' , i)
    response.json( mensajes);
})

// Cuando tenemos un cliente conectado
io.on('connection', (client) =>{
    const { id } = client;
    console.log(`Cliente conectado ${id}`);

    io.on('error', (error) => { console.error(error)});

    // Recibimos el mensaje
    client.on('mensaje', (data) => {
        console.log(`Mensaje recibido de ID ${id} `, data);
        mensajes.push(data);
        io.emit('mensajes', mensajes);
    })


    

    // Cuando el cliente se desconecta
    client.on('disconnect', () => {
        console.log(`Cliente ID ${id} desconectado`);
    })

})



server.listen( PORT, () =>{
    console.log(`Servidor en el puerto ${PORT}`);
})