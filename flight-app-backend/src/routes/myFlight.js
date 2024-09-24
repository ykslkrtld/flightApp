"use strict"
/* -------------------------------------------------------
    | Havalimanı Node / Express |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const myFlight = require('../controllers/myFlight')

// URL: /myFlight

router.route("/")
  .get(myFlight.list)
  .post(myFlight.create)

router.route("/:id")
  .get(myFlight.read)
  .put(myFlight.update)
  .patch(myFlight.update)
  .delete(myFlight.delete);


/* ------------------------------------------------------- */
module.exports = router;
