const express = require('express')
const {verificaToken} = require('../middleware/authentication')
let app = express()
let Product = require('../models/product')
const _ = require('underscore')

app.post('/product', verificaToken, (req, res) => {
  let body = req.body
  let product = Product({
    name: body.name,
    unitPrice: body.unitPrice,
    description: body.description,
    img: body.img,
    available: body.available,
    category: body.category,
    user: req.user._id
  })
  product.save((err, productDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!productDB) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.status(201).json({ // estado 201 que indica la creacion de un nuevo registro
      ok: true,
      product: productDB
    })
  })
})

app.get('/product', verificaToken, (req, res) => {
  let limit = Number(req.query.limit) || 5
  let desde = Number(req.query.desde) || 0
  Product.find({available: true})
    .skip(desde)
    .limit(limit)
    .populate('user', 'name email')
    .populate('category', 'description')
    .exec((err, products) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
      Product.count({}, (errC, nroProducts) => {
        res.json({
          ok: true,
          products,
          nroProducts
        })
      })
    })
})

app.get('/product/:id', verificaToken, (req, res) => {
  let id = req.params.id
  Product.findById(id)
    .populate('user', 'name email')
    .populate('category', 'name')
    .exec((err, productDB) => {
      if (err) {
        return res.status(500).json({
          ok: true,
          err
        })
      }
      if (!productDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'El Id no es valido'
          }
        })
      }
      res.json({
        ok: true,
        product: productDB
      })
    })
})

app.put('/product/:id', verificaToken, (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['name', 'unitPrice', 'img'])
  Product.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, productDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }

    if (!productDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El Id no es valido'
        }
      })
    }

    res.json({
      ok: true,
      product: productDB
    })
  })
})

app.delete('/product/:id', verificaToken, (req, res) => {
  let id = req.params.id
  let availableModified = {
    available: false
  }
  Product.findByIdAndUpdate(id, availableModified, {new: true}, (err, productDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      product: productDB
    })
  })
})

app.get('/product/search/:match', verificaToken, (req, res) => {
  let termino = req.params.match
  let regex = RegExp(termino, 'i')

  Product.find({name: regex, available: true})
    .populate('category', 'name')
    .exec((err, products) => {
      if (err) {
        res.status(500).json({
          ok: true,
          err
        })
      }
      res.json({
        ok: true,
        products
      })
    })
})

module.exports = app
