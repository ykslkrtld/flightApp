"use strict"
/* -------------------------------------------------------
    | Havalimanı Node / Express |
------------------------------------------------------- */

const router = require('express').Router()

/* ------------------------------------------------------- */
// routes/:

// URL: /

// flights:
router.use('/flights', require('./flight'))

// myFlight:
router.use('/myFlight', require('./myFlight'))



/* ------------------------------------------------------- */
module.exports = router