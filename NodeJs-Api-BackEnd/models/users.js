'use strict'

//Linea para conectarnos a la base de datos en MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsersSchema = Schema({
    name: String,
    email: String,
    password: String,
    session: Boolean
}, {
        //Registra en la base de datos la fecha de creacion
        timestamps: true
   }
);

module.exports = mongoose.model('Users', UsersSchema);