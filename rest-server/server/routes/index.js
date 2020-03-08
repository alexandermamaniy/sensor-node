const express = require('express')

const app = express()

app.use(require('./users'))
app.use(require('./login'))
app.use(require('./upload'))
app.use(require('./images'))
module.exports = app
