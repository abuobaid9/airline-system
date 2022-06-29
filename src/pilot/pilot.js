'use strict';
require('dotenv').config();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/airline`;
const systemConnection = io.connect(host);

systemConnection.on('new-flight',handleNewFlight);

function handleNewFlight(payload){

    setTimeout(() => {
        payload.Flight.event='took-off';
        console.log(`Pilot: flight with ID '${payload.Details.flightID}' took-off`);
        systemConnection.emit('took-off',payload);          
    },4000);
 

}

let host2 = `http://localhost:${process.env.PORT}/`;
const systemConnection2 = io.connect(host2);

systemConnection2.on('new-flight',handleNewFlight2);

function handleNewFlight2(payload){

    setTimeout(() => {
        payload.Flight.event='arrived';
        console.log(`Pilot: flight with ID '${payload.Details.flightID}' has arrived`);
        systemConnection2.emit('arrived',payload);      
    },7000);

}
systemConnection2.emit('get-all');
systemConnection2.emit('flight',handleFlight);
function handleFlight (payload){
    console.log(`Pilot:Sorry i didn't catch this flight ID ${payload.id} `);
    socket.emit('received', payload);
}