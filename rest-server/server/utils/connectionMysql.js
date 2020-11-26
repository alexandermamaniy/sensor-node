
var mysql      = require('mysql');
require('../config/config')

const queryMysql = ( query ) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
            host     : process.env.HOST_DB,
            user     : process.env.USER_DB,
            password : process.env.PASSWORD_DB,
            database : process.env.DATABASE_DB
          });

          connection.query(query, function (error, results, fields) {
            if(error) {
                reject(error)
            } else {
                resolve(results)
            }
          });
    })
}

module.exports = {queryMysql}