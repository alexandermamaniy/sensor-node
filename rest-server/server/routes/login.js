const express = require('express')

const app = express()

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

// libreria para la generacion de webtoken
const jwt = require('jsonwebtoken')

// importamos modelo USer de mongo
// const User = require('../models/user')
const {queryMysql} = require('../utils/connectionMysql')


app.post('/login', (req, res) => {
  let body = req.body

  queryMysql(`select  username, state, role, password from user_a where state=true and username='${body.username}' limit 1`)
  .then( data => {

    if (!data) {
      return res.status(400).json({
        ok: false,
        err: {
          massage: '(Usuario) o contraseña incorrecta'
        }
      })
    }

    // contraseña normar, contraseña ecriptada
    if (!bcript.compareSync(body.password, data[0].password)) {
      return res.status(400).json({
        ok: false,
        err: {
          massage: 'Usuario o (contraseña) incorrecta'
        }
      })
    }

    let token = jwt.sign({
      user: data[0]
    }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

    res.json({
      ok: true,
      user: data,
      token
    })
  })
  .catch(error => {
    return res.status(500).json({
      ok: false,
      err: error
    })
  }) 
})

module.exports = app
