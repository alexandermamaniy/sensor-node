
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let humiSchema = new Schema({
  humidity: { type: String, required: [true, 'La Humedad es necesaria'] },
  date: { type: String, required: [false, 'La fecha es necesaria'] },
  hour: { type: String, required: [false, 'La hora es necesaria'] }
})

module.exports = mongoose.model('Humidity', humiSchema)
