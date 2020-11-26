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
process.env.URLDB = (process.env.NODE_ENV === 'dev') ? "mongodb://alex:pepito1234@ds139037.mlab.com:39037/temperatura" : process.env.MONGO_URI
// process.env.URLDB = (process.env.NODE_ENV === 'dev') ? 'mongodb:\/\/localhost:27017/sensor-node' : process.env.MONGO_URI

process.env.HOST_DB = process.env.HOST_DB || 'localhost'
process.env.USER_DB = process.env.USER_DB || 'root'
process.env.PASSWORD_DB = process.env.PASSWORD_DB || 'example'
process.env.DATABASE_DB = process.env.DATABASE_DB || 'sensornode'



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
