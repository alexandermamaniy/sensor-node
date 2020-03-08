const mongoose = require('mongoose')

let Schema = mongoose.Schema

let categorySchema = new Schema({
  description: {
    type: String,
    required: [true, 'la descripcion es oblgatoria'],
    unique: true
  },
  user: {
    type: Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('Category', categorySchema)
