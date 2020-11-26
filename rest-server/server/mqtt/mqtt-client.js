var mqtt = require('mqtt')
require('../config/config')

const {queryMysql} = require('../utils/connectionMysql')

var client  = mqtt.connect(process.env.SERVER_MQTT)
// const Temperature = require('../models/temperature') 
// const Humidity = require('../models/humidity') 

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
    let dateNow =  `${f.getFullYear()}-${f.getMonth() +1}-${f.getDate()}`;
    let hourNow =  `${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
   
    queryMysql(`insert into temperature(temp, date_h, hour) values (${message},'${dateNow}', '${hourNow}')`)
    .then( data => {
      console.log('Se  guardo temperatura')
    })
    .catch(error => {
      console.log('Error al guardar temperatura', error)
    }) 
    
    // let temp = new Temperature({
    //     temp: message,
    //     date: dateNow,
    //     hour: hourNow
    //   })
    //   // metodo save para guardar un user en mondoDB
    //   temp.save((err, tempDB) => {
    //     if (err) {
    //         console.log('Error al guardar temperatura', err)
    //     } else {
    //         console.log('Se  guardo temperatura')
    //     }
    //   })
  }
  
  if( topic == 'humidity'){

    let f = new Date();
    let dateNow =  `${f.getFullYear()}-${f.getMonth() +1}-${f.getDate()}`;
    let hourNow =  `${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
   
    queryMysql(`insert into humidity(humidity, date_h, hour) values (${message},'${dateNow}', '${hourNow}')`)
    .then( data => {
      console.log('Se  guardo humedad')
    })
    .catch(error => {
      console.log('Error al guardar humedad', error)
    }) 

    // let f = new Date();
    // let dateNow =  `${f.getDate()}/${f.getMonth() +1}/${f.getFullYear()}`;
    // let hourNow =  `${f.getHours()}:${f.getMinutes()}:${f.getSeconds()}`;
    // let humi = new Humidity({
    //     humidity: message,
    //     date: dateNow,
    //     hour: hourNow
    //   })
    //   // metodo save para guardar un user en mondoDB
    //   humi.save((err, humiDB) => {
    //     if (err) {
    //         console.log('Error al guardar Humedad', err)
    //     } else {
    //         console.log('Se  guardo Humedad')
    //     }
    //   })
  }
//   client.end()
})