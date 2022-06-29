'use strict';

require('dotenv').config();
const PORT = process.env.PORT || 3030;
const uuid = require('uuid').v4;

const ioServer = require('socket.io')(PORT);
const queue = {
    flights: {

    }
};

const airLineConnection = ioServer.of('/airline');

airLineConnection.on('connection', (socket) => {
    socket.on('took-off', (payload) => {
        console.log("Flight ", payload.Flight);
    })
})
ioServer.on('connection', (socket) => {

    socket.on('new-flight', (payload) => {
        // console.log("Flight ", payload.Flight);
        const id = uuid();
        queue.flights[id] = payload.Flight;
        console.log( 'flight',queue.flights)
        airLineConnection.emit('new-flight', payload);
        ioServer.emit('new-flight', payload);
     
    });
    socket.on('arrived', (payload) => {
        console.log("Flight ", payload.Flight);
        ioServer.emit('arrived', payload);
    })
    socket.on('get_all', () => {
        console.log('get all flights');

        Object.keys(queue.flights).forEach((id) => {
            socket.emit('flight', {
                id: id,
                payload:  queue.flights[id]
                
            })
        })
    })
    // delete queue.flights[id];
    socket.on('received', (flight) => {
        //this will remove the task from the msgQueue
        delete queue.flights[flight.id];
        console.log('flight done and deleted');
    })

});