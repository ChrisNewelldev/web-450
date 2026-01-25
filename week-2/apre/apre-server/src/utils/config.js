/**
 * Title: config.js
 * Author: Professor Krasso
 * Date: 8/4/23
 */

'use strict'

// Declare the database object
const db = {
  username: 'apre_user', // This is the username for the database
  password: 's3cret', // This is the password for the database
  name: 'apre' // This is the name of the database in MongoDB
}

// Declare the config object
const config = {
  port: 3000, // This is the default port for MongoDB
  dbUrl: 'mongodb://127.0.0.1:27017/apre',
  dbname: db.name // This is the name of the database in MongoDB
}

module.exports = config // Expose the config as a module