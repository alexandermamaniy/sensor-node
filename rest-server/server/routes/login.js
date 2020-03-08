const express = require('express')

const app = express()

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

// libreria para la generacion de webtoken
const jwt = require('jsonwebtoken')

// importamos modelo USer de mongo
const User = require('../models/user')

// libreria que nos brinda google para el Sign-In
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

// promesa que nos retorna el payload de la validacion del token de google
async function verify (token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend Or, if multiple clients access the backend: [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  })
  const payload = ticket.getPayload()
  return {
    name: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true
  }
}

// callback que se llama para validar, o guardar un nuevo usuario signieado con google
app.post('/google', async (req, res) => {
  let token = req.body.idtoken
  let googleUser = await verify(token)
    .catch(e => {
      res.status(403).json({
        ok: false,
        err: e
      })
    })

  User.findOne({email: googleUser.email}, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (userDB) {
      if (userDB.google === false) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Debe usar la autentificacion normal'
          }
        })
      } else {
        let token = jwt.sign({
          user: userDB
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

        return res.json({
          ok: true,
          user: userDB,
          token
        })
      }
    } else {
      // si el usuario no existe en nuestra base de datos
      let user = new User()
      user.name = googleUser.name
      user.email = googleUser.email
      user.img = googleUser.img
      user.google = true
      user.password = ':)'

      user.save((err, userDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err
          })
        }

        let token = jwt.sign({
          user: userDB
        }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

        return res.json({
          ok: true,
          user: userDB,
          token
        })
      })
    }
  })
})

app.post('/login', (req, res) => {
  let body = req.body

  User.findOne({email: body.email}, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          massage: '(Usuario) o contraseña incorrecta'
        }
      })
    }
    // contraseña normar, contraseña ecriptada
    if (!bcript.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          massage: 'Usuario o (contraseña) incorrecta'
        }
      })
    }

    let token = jwt.sign({
      user: userDB
    }, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN})

    res.json({
      ok: true,
      user: userDB,
      token
    })
  })
})

module.exports = app
