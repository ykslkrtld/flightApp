"use strict"
/* -------------------------------------------------------
    | Mind Canvas |
------------------------------------------------------- */

const { mongoose } = require('../configs/dbConnection')

/* ------------------------------------------------------- */

const MyFlightSchema = new mongoose.Schema(
    {
    flightId: {
        type: String,
        trim: true,
    },
    flightNumber: {
        type: String,
        trim: true,
    },
    flightName: {
        type: String,
        trim: true,
    },
    departureLocation: {
        type: String,
        trim: true,
    },
    departureAirport: {
        type: String,
        trim: true,
    },
    arrivalLocation: {
        type: String,
        trim: true,
    },
    arrivalAirport: {
        type: String,
        trim: true,
    },
    departureDateTime: {
        type: String,
        trim: true,
    },
    arrivalDateTime: {
        type: String,
        trim: true,
    },
    airline: {
        type: String,
        trim: true,
    },
    tripType: {
        type: String,
        trim: true,
    },
    

    },
    {collection: "myFlightss", timestamps: true}
)

module.exports = mongoose.model('MyFlight', MyFlightSchema);