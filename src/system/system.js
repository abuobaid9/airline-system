'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3030;

const ioServer = require('socket.io')(PORT);

const airLineConnection =ioServer.of('/airline');

airLineConnection.on('connection',(socket)=>{
    socket.on('took-off',(payload)=>{
        console.log( "Flight ", payload.Flight);
    })
})
ioServer.on('connection', (socket) => {
  
    socket.on('new-flight', (payload) => {
        console.log( "Flight ", payload.Flight);
        airLineConnection.emit('new-flight',payload);
        ioServer.emit('new-flight',payload);

        });
    socket.on('arrived', (payload) => {
        console.log( "Flight ", payload.Flight);
        ioServer.emit('arrived',payload);
    })


});