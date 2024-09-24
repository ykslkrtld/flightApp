"use strict"
/* -------------------------------------------------------
    | Havalimanı Node / Express |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const flight = require('../controllers/flight')

// URL: /flights

router.route("/")
  .get(flight.list)

/* ------------------------------------------------------- */
module.exports = router;
