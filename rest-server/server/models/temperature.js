
let mongoose = require('mongoose')
let Schema = mongoose.Schema

let tempSchema = new Schema({
  temp: { type: String, required: [true, 'La temperatura es necesaria'] },
  date: { type: String, required: [false, 'La fecha es necesaria'] }
})

module.exports = mongoose.model('Temperature', tempSchema)
