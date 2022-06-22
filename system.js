
'use strict';

require('./src/manager /manager');
require('./src/pilot/pilot');
const events = require('./src/events');

events.on('new-flight',handleNewFlight )
function handleNewFlight (payload){
    console.log( "Flight ", payload.Flight);
}

events.on('took-off',flightOff )
function flightOff (payload){
    console.log( "Flight ", payload.Flight);
}

events.on('arrived',flightArr)
function flightArr (payload){
    console.log( "Flight ", payload.Flight);
}