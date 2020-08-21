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
process.env.URLDB = (process.env.NODE_ENV === 'dev') ? 'mongodb://alex:pepito1234@ds263107.mlab.com:63107/sensor-node' : process.env.MONGO_URI

// ======================
// Vencimiento del token
// ======================
// segundos
// minutos
// horas
// dias

process.env.CADUCIDAD_TOKEN = '48h'



// ======================
// URL del servidor MQTT
// ======================

process.env.SERVER_MQTT = process.env.SERVER_MQTT || "mqtt:localhost"


// ======================
// Semilla de Token
// ======================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'
