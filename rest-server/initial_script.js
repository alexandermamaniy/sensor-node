require('./server/config/config')
require('colors')

const mongoose = require('mongoose')

// importamos modelo USer de mongo
const User = require('./server/models/user')

// paqute que nos permite la incriptacioin de una via
const bcript = require('bcrypt')

let create_user = () => {
    return new Promise((resolve, reject) => {
    
        let user = new User({
            ci: '0000000 Cb',
            name: 'Administrador',
            lastname: 'Administrador',
            email: 'admin@gmail.com',
            username: 'admin',
            password: bcript.hashSync('admin123', 10),
            role: 'ADMIN_ROLE'
          })
    
        user.save((err, userDB) => {
            if (err) {
                reject(err)
            } else {
                resolve(userDB.username)
            }
        })
    });
}


mongoose.connect(process.env.URLDB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites:false})
    .then(() => {
        create_user()
        .then((username) => {

            console.log(`Se creo correctamente el usuario: ${username}`.green)
            process.exit()
        })
        .catch((err) => console.log("Error al crear el usuario".red, err))
    })
    .catch((error) => {
      console.log(error.red)
    })



