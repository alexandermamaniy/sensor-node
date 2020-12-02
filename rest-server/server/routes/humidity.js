const express = require('express')
const {verificaToken, verificaAdminRole} = require('../middleware/authentication')
const app = express()
const {queryMysql} = require('../utils/connectionMysql')

// importamos modelo USer de mongo
const Humidity = require('../models/humidity')

app.get('/humidity',  [verificaToken, verificaAdminRole], (req, res) => {
    
  queryMysql('select id, humidity, date_h as date, hour from humidity  ORDER BY date_h DESC')
  .then( data => {
    res.json({
      ok: true,
      humidities: data,
      nroHumidities: data.length
    })
  })
  .catch(error => {
    return res.status(400).json({
      ok: false,
      err: error
    })
  }) 
})

module.exports = app
