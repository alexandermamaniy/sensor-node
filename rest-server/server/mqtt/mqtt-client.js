var mqtt = require('mqtt')
require('../config/config')
var client  = mqtt.connect(process.env.SERVER_MQTT)
const Temperature = require('../models/temperature') 
const Humidity = require('../models/humidity') 

client.on('connect', function () {
  client.subscribe('temp', function (err) {
    if (!err) {
        console.log("Me subscribi bien a temperatura");
    }
  })

  client.subscribe('humidity', function (err) {
    if (!err) {
        console.log("Me subscribi bien a humedad");
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString(), topic)

  if(topic == 'temp'){

    let f = new Date();
    let dateNow =  `${f.getDate()}/${f.getMonth() +1}/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;


    let temp = new Temperature({
        temp: message,
        date: dateNow
      })
      // metodo save para guardar un user en mondoDB
      temp.save((err, tempDB) => {
        if (err) {
            console.log('Error al guardar temperatura', err)
        } else {
            console.log('Se  guardo temperatura')
        }
      })
  }
  
  if( topic == 'humidity'){

    let f = new Date();
    let dateNow =  `${f.getDate()}/${f.getMonth() +1}/${f.getFullYear()} ${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;

    let humi = new Humidity({
        humidity: message,
        date: dateNow
      })
      // metodo save para guardar un user en mondoDB
      humi.save((err, humiDB) => {
        if (err) {
            console.log('Error al guardar Humedad', err)
        } else {
            console.log('Se  guardo Humedad')
        }
      })
  }
//   client.end()
})