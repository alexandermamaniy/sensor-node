const express = require('express')
const fileUpload = require('express-fileupload')
const app = express()
const User = require('../models/user')
const Product = require('../models/product')
const path = require('path')
const fs = require('fs')

// default options
app.use(fileUpload())

app.put('/upload/:tipo/:id', (req, res) => {
  let tipo = req.params.tipo
  let id = req.params.id
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'No se ha seleccionado ningún archivo'
      }
    })
  }

  // Valida tipo
  let tiposValidos = ['products', 'users']
  if (tiposValidos.indexOf(tipo) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Los tipos permitidas son ' + tiposValidos.join(', ')
      }
    })
  }

  let archivo = req.files.file
  let nombreCortado = archivo.name.split('.')
  let extension = nombreCortado[nombreCortado.length - 1]

  // Extensiones permitidas
  let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg']

  if (extensionesValidas.indexOf(extension) < 0) {
    return res.status(400).json({
      ok: false,
      err: {
        message: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
        ext: extension
      }
    })
  }

  // Cambiar nombre al archivo
  // 183912kuasidauso-123.jpg
  let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`

  archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
    if (tipo === 'users') {
      imagenUsuario(id, res, nombreArchivo)
    } else {
      imagenProducto(id, res, nombreArchivo)
    }
  })
})

let imagenUsuario = (id, res, nombreArhivo) => {
  User.findById(id, (err, userDB) => {
    if (err) {
      borrarArchivo(nombreArhivo, 'users')
      res.status(500).json({
        ok: false,
        err
      })
    }

    if (!userDB) {
      borrarArchivo(nombreArhivo, 'users')
      res.status(400).json({
        ok: false,
        err: {
          message: 'El id no es valido'
        }
      })
    }

    borrarArchivo(userDB.img, 'users')
    userDB.img = nombreArhivo

    userDB.save((errS, userSave) => {
      res.json({
        ok: true,
        user: userDB,
        img: nombreArhivo
      })
    })
  })
}

let imagenProducto = (id, res, nombreArhivo) => {
  Product.findById(id, (err, productDB) => {
    if (err) {
      borrarArchivo(nombreArhivo, 'products')
      res.status(500).json({
        ok: false,
        err
      })
    }

    if (!productDB) {
      borrarArchivo(nombreArhivo, 'products')
      res.status(400).json({
        ok: false,
        err: {
          message: 'El id no es valido'
        }
      })
    }

    borrarArchivo(productDB.img, 'products')
    productDB.img = nombreArhivo

    productDB.save((errS, userSave) => {
      res.json({
        ok: true,
        user: productDB,
        img: nombreArhivo
      })
    })
  })
}

let borrarArchivo = (nombreArchivo, tipo) => {
  let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreArchivo}`)
  if (fs.existsSync(pathImagen)) {
    fs.unlinkSync(pathImagen)
  }
}
module.exports = app
