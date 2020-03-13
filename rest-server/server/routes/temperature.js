const express = require('express')
const {verificaToken, verificaAdminRole} = require('../middleware/authentication')
const app = express()

// importamos modelo USer de mongo
const Temperature = require('../models/temperature')

app.get('/temperature', [verificaToken, verificaAdminRole], (req, res) => {
    
  
    Temperature.find({},'temp date')
      //.skip(desde) // desde que regitro a empezar a devolver
      //.limit(limit) // definimos el limite de registros a devolver
      .exec((err, temps) => {
        if (err) {
          return res.status.json({
            ok: false,
            err
          })
        }
        Temperature.count({}, (errC, nroTemp) => {
          res.json({
            ok: true,
            temps,
            nroTemp
          })
        })
      })
  })

module.exports = app
