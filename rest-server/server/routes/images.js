const express = require('express')
const fs = require('fs')
const path = require('path')
const {verificaTokenImg} = require('../middleware/authentication')
const app = express()

app.get('/image/:tipo/:img', verificaTokenImg, (req, res) => {
  let tipo = req.params.tipo
  let img = req.params.img

  let pathImage = path.resolve(__dirname, `../../uploads/${tipo}/${img}`)

  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage)
  } else {
    let noImgPath = path.resolve(__dirname, '../assets/no-image.jpg')
    res.sendFile(noImgPath)
  }
})

module.exports = app
