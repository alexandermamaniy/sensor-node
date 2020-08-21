# SENSOR NODE

### DEPENDENCIAS

Las dependecias necesarias son:

##### Cliente y servidor
* [nodejs] - entorno para desarrollo de apliaciones con javascript
* [npm] - manejador de dependencias para nodejs
* [AngularJS] - framework para desarrollo frontend!
* [mongodb] - base de datos no relacional para el backend!
* [mosquitto] - cliente mosquitto MQTT para el backend

##### raspberry
* [mosquitto] - servidor modquitto MQTT
* [nodered] - plataforma para la integracion de dispositivos arduinos, raspberry,..etc

##### nodemcu
..
..

### Installation
Clonamos el proyecto del repositorio de github e ingresamos en el directorio
```
$ git clone https://github.com/akey96/sensor-node.git
$ cd sensor-node
```
#### Servidor 
Ingresamos al directorio del servidor e instalamos las dependencias necesarias para el servidor
```
$ cd rest-server
$ npm install
```
Levantamos el servidor con el siguiente comando
```
$ npm run nodemon
```
La configuracion de las variables necesarias para el servidor se encuentra en la siguiente ruta:
```
$ rest-server/server/config/config.js
```
Para crear el usuario admin ejecute este comando:
```
$ npm run create_admin
```

#### Cliente 
Ingresamos al directorio del cliente e instalamos las dependencias necesarias
```
$ cd web-page
$ npm install
```
Levantamos el cliente
```
$ ng serve
```
Abrimos el naveragador con ls siguiente url: http://localhost:4200
La configuracion de cliente se encuentra en la siguiente ruta:
```
$ web-page/src/environments/environment.ts
```
