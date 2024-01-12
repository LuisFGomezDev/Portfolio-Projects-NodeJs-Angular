//'use strict'

//Linea para Cargar la libreria EXPRESS
const express = require('express');
const bodyParser = require('body-parser');

//Asignamos los nuevos modulos
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express();

//Seteamos el motor de plantillas
app.set('view engine', 'ejs')

//Seteamos la carpeta public para archivos estaticos
app.use(express.static('public'))

//Seteamos para procesar los datos enviados desde Angular
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Seteamos las variables de entorno
dotenv.config({path: './env/.env'})

//app.use(cookieParser)

//Cargamos JWT - JSON WEB TOKEN





//Configurar o Cargar los archivos de rutas
var project_routes = require('./routes/project');


//Configurar los MIDDLEWARES que se ejecutan antes de que actue la capa controlador

//Configuracion para bodyy-parser en EXPRESS
app.use(bodyParser.urlencoded({extended:false}));

//Configuracion para convertir los datos con body-parser a JSON
app.use(bodyParser.json());

//CONFIGURAR CORS Y CABECERAS DE LAS PETICIONES
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//RUTAS EXACTAS

//ENVIANDO DATOS POR MEDIO DE UN JSON - CON EL METODO GET - HTTP
/*
app.get('/test', (req, res) => {
    res.status(200).send({
        message: "Hola mundo desde mi API NODE-JS"

    });
});

//ENVIANDO DATOS DE SOLO TEXTO - CON EL METODO GET
app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>Hola mundo desde mi API NODE-JS</h1>"
    );
});
*/

app.use('/api', project_routes);

//Exportar
module.exports = app;