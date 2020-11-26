const express = require('express')
const {verificaToken, verificaAdminRole} = require('../middleware/authentication')
const app = express()
const {queryMysql} = require('../utils/connectionMysql')



// importamos modelo USer de mongo
const Temperature = require('../models/temperature')

app.get('/temperature', [verificaToken, verificaAdminRole], (req, res) => {
    
  queryMysql('select id, temp, date_h as date, hour from temperature  ORDER BY date_h DESC')
  .then( data => {
    res.json({
      ok: true,
      temps: data,
      nroTemp: data.length
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
