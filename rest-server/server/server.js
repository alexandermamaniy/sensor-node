require('./config/config')
require('colors')
require('./mqtt/mqtt-client')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
var cors = require('cors')
const app = express()



// use cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type','Authorization'],
  'exposedHeaders': ['sessionId','Authorization'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// usando las rutas configuradas
app.use(require('./routes/index'))

// habilitar la carpeta public como publica

app.use(express.static(path.resolve(__dirname, '../public')))

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => {
    console.log('Mongo corriendo de forma correcta'.green)
  })
  .catch((error) => {
    console.log(error.red)
  })

app.listen(process.env.PORT, () => console.log(`escuchando por el puerto ${process.env.PORT}`))
