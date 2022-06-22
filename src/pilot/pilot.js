'use strict';
const events = require("../events");

events.on('new-flight',handleNewFlight);

function handleNewFlight(payload){

    setTimeout(() => {
        payload.Flight.event='took-off';
        console.log(`Pilot: flight with ID '${payload.Details.flightID}' took-off`);
        events.emit('took-off',payload);          
    },4000);
    setTimeout(() => {
        payload.Flight.event='arrived';
        console.log(`Pilot: flight with ID '${payload.Details.flightID}' has arrived`);
        events.emit('arrived',payload);      
    },7000);

}

