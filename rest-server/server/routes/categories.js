const express = require('express')

const Category = require('../models/category')

const {verificaToken, verificaAdminRole} = require('../middleware/authentication')

// importacion de underscore
const _ = require('underscore')

const app = express()

app.get('/category', verificaToken, (req, res) => {
  // query nos devuleve los parametros pasados en la url
  Category.find({})
    .exec((err, categories) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
      Category.count({}, (errC, nroCategories) => {
        res.json({
          ok: true,
          categories,
          nroCategories
        })
      })
    })
})

app.get('/category/:id', verificaToken, (req, res) => {
  let id = req.params.id
  Category.findById(id, (err, categoryID) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!categoryID) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El ID no es valido'
        }
      })
    }
    res.json({
      ok: true,
      category: categoryID
    })
  })
})

app.post('/category', verificaToken, (req, res) => {
  let body = req.body

  let category = new Category({
    description: body.description,
    user: req.user._id
  })

  category.save((err, categoryDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!categoryDB) {
      res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      category: categoryDB
    })
  })
})

app.put('/category/:id', [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['description'])
  Category.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, categoryDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      category: categoryDB
    })
  })
})

app.delete('/category/:id', [verificaToken, verificaAdminRole], (req, res) => {
  let id = req.params.id
  Category.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      return res.status(500).json({
        ok: true,
        err
      })
    }
    if (!userDeleted) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'User no encontrado'
        }
      })
    }
    res.json({
      ok: true,
      message: 'Categoria Borrada'
    })
  })
})

module.exports = app
