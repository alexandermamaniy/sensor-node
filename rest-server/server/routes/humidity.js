const express = require('express')
const {verificaToken, verificaAdminRole} = require('../middleware/authentication')
const app = express()

// importamos modelo USer de mongo
const Humidity = require('../models/humidity')

app.get('/humidity', [verificaToken, verificaAdminRole], (req, res) => {
    
  
    Humidity.find({},'humidity date')
      .sort({ date: 'desc' })
      .exec((err, humidities) => {
        if (err) {
          return res.status.json({
            ok: false,
            err
          })
        }
        Humidity.count({}, (errC, nroHumidities) => {
          res.json({
            ok: true,
            humidities,
            nroHumidities
          })
        })
      })
  })

module.exports = app
