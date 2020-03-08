// ======================
// PUERTO
// ======================
process.env.PORT = process.env.PORT || 3000

// ======================
// ENTORNO
// ======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

// ======================
// Base de DATOS
// ======================
process.env.URLDB = (process.env.NODE_ENV === 'dev') ? 'mongodb://localhost/cafe' : process.env.MONGO_URI

// ======================
// Vencimiento del token
// ======================
// segundos
// minutos
// horas
// dias

process.env.CADUCIDAD_TOKEN = '48h'

// ======================
// Semilla de Token
// ======================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'
