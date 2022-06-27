'use strict';
require('dotenv').config();
const { faker } =require('@faker-js/faker');
// const events = require('../events');
let destinationCity = 	faker.address.city();
const pilotName =faker.name.findName();
const randomId =faker.datatype.uuid();
const data = faker.date.past();
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/`;
const systemConnection = io.connect(host);

systemConnection.on('arrived', (payload)=>{
    setTimeout(() => {
        console.log(`Manager: we're greatly thankful for the amazing flight, ${payload.Details.pilot}`);            
    },);
})

setInterval(() => {
    let Flight={
        event :'new-flight',
        time : data,
        Details : {
            airLine: 'Royal Jordanian Airlines',
            destination: destinationCity,
            pilot: pilotName,
            flightID: randomId
        }
    }
    console.log(`Manager: new flight with ID '${Flight.Details.flightID}' have been scheduled`);
    systemConnection.emit('new-flight',{Flight:Flight,Details:Flight.Details});
}, 10000)