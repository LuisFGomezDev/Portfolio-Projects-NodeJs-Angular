'use strict'

//Linea para conectarnos a la base de datos en MongoDB
var mongoose = require('mongoose');

//Declarar las variables del SERVER Node
var app = require('./app');
var port = 3700;


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/portafolio')
        .then(()=>{
            console.log("Conexion BD Establecida exitosamente Ahora");

            //CREACION DEL SERVIDOR NODE CON EXPRESS
            app.listen(port, () => {
                console.log("Servidor corriendo correctamente sobre el puerto 3700");

            });
        })
        .catch(err => console.log(err));