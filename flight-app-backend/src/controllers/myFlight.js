"use strict"
/* -------------------------------------------------------
    | Mind Canvas |
------------------------------------------------------- */

const MyFlight = require('../models/myFlight')

module.exports = {

    list: async (req, res) => {

        const data = await MyFlight.find()

        res.status(200).send({
            error: false,
            data
        })

    },
    create: async (req, res) => {

      const { flightId } = req.body;

      // Aynı flightId ile daha önce rezervasyon yapılmış mı kontrol et
      const existingReservation = await MyFlight.findOne({ flightId });
      if (existingReservation) {
          return res.status(400).send({
              error: true,
              message: "This flight has already been booked."
          });
      }

      // Eğer rezervasyon yoksa yeni rezervasyonu oluştur
      const data = await MyFlight.create(req.body);

      res.status(201).send({
          error: false,
          data
      });

    },
    read: async (req, res) => {

        const data = await MyFlight.findOne({ _id: req.params.id });
    
        res.status(200).send({
          error: false,
          data,
        });
      },
    
    update: async (req, res) => {
        
        const data = await MyFlight.updateOne({ _id: req.params.id }, req.body, {
          runValidators: true,
        });
    
        res.status(202).send({
          error: false,
          data,
          new: await MyFlight.findOne({ _id: req.params.id }),
        });
      },
    
    delete: async (req, res) => {

        const data = await MyFlight.deleteOne({ _id: req.params.id });
        res.status(data.deletedCount ? 204 : 404).send({
          error: !data.deletedCount,
          data,
        });
      },

}
