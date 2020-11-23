require('./config/config')
require('colors')
require('./mqtt/mqtt-client')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
var cors = require('cors')
const app = express()

jasper = require('node-jasper')({
  path:'lib/jasperreports-6.2.0',
  reports: {
    hw: {
      jasper: 'reports/hello_world.jasper'}
    }});

app.get('/report', function(req, res, next) {
  console.log(__dirname)
  let report = {
     report: 'hw',
     data: {
       name: 'Lili',
       path_image_logo: `${__dirname}/reports/logo.png` }};
  let pdf = jasper.pdf(report);
  res.set({
     'Content-type': 'application/pdf',
     'Content-Length': pdf.length});
  res.send(pdf);
});


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
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites:false})
  .then(() => {
    console.log('Mongo corriendo de forma correcta'.green)
  })
  .catch((error) => {
    console.log(error.red)
  })

app.listen(process.env.PORT, () => console.log(`escuchando por el puerto ${process.env.PORT}`))
