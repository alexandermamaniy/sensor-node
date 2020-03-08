const express = require('express')
// importamos modelo USer de mongo
const User = require('../models/user')

const {verificaToken, verificaAdminRole} = require('../middleware/authentication')

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

// importacion de underscore
const _ = require('underscore')

const app = express()

app.get('/user', verificaToken, (req, res) => {
  // query nos devuleve los parametros pasados en la url
  let desde = Number(req.query.desde) || 0
  let limit = Number(req.query.limit) || 5

  User.find({state: true}, 'name email state google role')
    .skip(desde) // desde que regitro a empezar a devolver
    .limit(limit) // definimos el limite de registros a devolver
    .exec((err, users) => {
      if (err) {
        return res.status.json({
          ok: false,
          err
        })
      }
      User.count({state: true}, (errC, nroUsers) => {
        res.json({
          ok: true,
          users,
          nroUsers
        })
      })
    })
})

app.delete('/user/:id', [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id
  let stateModified = {
    state: false
  }
  User.findByIdAndUpdate(id, stateModified, {new: true}, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      user: userDB
    })
  })

  // =================== otra manera =========
  // User.findById(id, function (err, userID) {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       err
  //     })
  //   }
  //   userID.state = false
  //   userID.save((errS) => {
  //     if (errS) {
  //       return res.status(400).json({
  //         ok: false,
  //         err: errS
  //       })
  //     }
  //     res.json({
  //       ok: true,
  //       user: userID
  //     })
  //   })
  // })
  // ================== mala forma ==========
  // User.findByIdAndRemove(id, (err, userDeleted) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: true,
  //       err
  //     })
  //   }
  //   if (!userDeleted) {
  //     return res.status(400).json({
  //       ok: false,
  //       err: {
  //         message: 'User no encontrado'
  //       }
  //     })
  //   }
  //   res.json({
  //     ok: true,
  //     userDeleted
  //   })
  // })
})

app.post('/user', (req, res) => {
  let body = req.body

  let user = new User({
    name: body.name,
    email: body.email,
    password: bcript.hashSync(body.password, 10),
    role: body.role
  })
  // metodo save para guardar un user en mondoDB
  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      user: userDB
    })
  })
})

app.put('/user/:id', [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'state'])

  // definimo tambien validaciones para que pueda retornar todo el objeto mofificado, y que corra las validaciones definidos en el modelo
  User.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    res.json({
      ok: true,
      user: userDB
    })
  })
})

module.exports = app
