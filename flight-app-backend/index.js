"use strict"
/* -------------------------------------------------------
    | Havalimanı Node / Express |
------------------------------------------------------- */
const express = require('express')
const app = express()
/* ------------------------------------------------------- */
const cors = require('cors');

app.use(cors("https://flight-app-ykslkrtld.vercel.app"));
/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()
/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

/* ------------------------------------------------------- */
// Routes:
app.use(require('./src/routes'))

/* ------------------------------------------------------- */
// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))