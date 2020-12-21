const express = require('express')
const http = require('http');
const app = express();



const servidor = http.createServer(app);

const socketio = require('socket.io');

const io = require("socket.io")(servidor, {
    cors: { origin: "*" },
  });

//const io = socketio(servidor);

io.on( 'connection', socket => {

    let nombre;
    //Para cuando alguien se conecta 
    socket.on('conectado', (nomb)=>{
        nombre = nomb;
        console.log("Usuario conectado")
        socket.broadcast.emit('mensajes', {nombre, mensaje: `${nombre} ha entrado a la sala del chat`})
    });
    // para enviar mensajes "mensaje"
    socket.on('mensaje', (nombre, mensaje)=>{
        io.emit('mensajes', {nombre, mensaje})
    });

    //Para desconectarse 
    socket.on('disconnect', ()=> {
        io.emit('mensajes', {servidor:"Servidor", mensaje: `${nombre} Ha abandonado la sala`})
    });
});

servidor.listen(3000, ()=> console.log("servidor inicializado"));