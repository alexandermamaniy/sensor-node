const express = require('express')
// importamos modelo USer de mongo
const User = require('../models/user')

const {verificaToken, verificaAdminRole} = require('../middleware/authentication')

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

// importacion de underscore
const _ = require('underscore')

const app = express()

app.get('/user', [verificaToken, verificaAdminRole], (req, res) => {
  // query nos devuleve los parametros pasados en la url
  // let desde = Number(req.query.desde) || 0
  // let limit = Number(req.query.limit) || 5

  User.find({state: true}, 'ci name lastname surname address cellphone email username state role')
    //.skip(desde) // desde que regitro a empezar a devolver
    //.limit(limit) // definimos el limite de registros a devolver
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

app.get('/user/:id', [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id

  User.findById(id, (err, userDB) => {
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
  });

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
})

app.post('/user', [verificaToken, verificaAdminRole],(req, res) => {
  let body = req.body

  let user = new User({
    ci: body.ci,
    name: body.name,
    lastname: body.lastname,
    surname: body.surname,
    address: body.address,
    cellphone: body.cellphone,
    email: body.email,
    username: body.username,
    password: bcript.hashSync(body.password, 10),
    img: body.img,
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
  let body = _.pick(req.body, ['ci', 'name', 'lastname', 'surname', 'address', 'cellphone', 'email', 'username', 'password', 'img', 'role', 'state'])

  if(body.password){
    body.password = bcript.hashSync(body.password, 10)
  }

  // definimo tambien validaciones para que pueda retornar todo el objeto mofificado, y que corra las validaciones definidos en el modelo
  User.findByIdAndUpdate(id, body, {new: true}, (err, userDB) => {
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
