'use strict'

const Users = require("../models/users"); //Esta linea carga el Schema Modelo de Users
var fs = require('fs'); //Libreria FileSystem para borrar un archivo del Sistema de directorios
const { exists } = require("../models/users");
var path = require('path');
const { isStringObject } = require("util/types");
const { default: mongoose } = require("mongoose");

//Configuracion opciones nuevas usuarios

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require("../models/users");
const SECRET_KEY = 'secretkey123456';


//Cargamos o Conectamos este Controlador con el Schema de la BD Project

var controller = 
{
    home: function(req, res)
    {
        return res.status(200).send({
            message: "Soy la HOME"

        });
    },

    test: function(req, res)
    {
        return res.status(200).send({
            message: 'Soy EL METODO O ACCION TEST DEL CONTROLLER PROJECT'

        });
    },


    //*****************************************************************
    //*****************************************************************

    //Creamos el metodo getUser - Para buscar un User y su Password Existentes
    getLoginUser: function(req, res)
    {
        var userEmail = req.params.email;
        var userPsw = req.params.psw;
           
        if((userEmail == null) && (userPsw == null))
        {
            return res.status(404).send({message: 'Falta el email o la clave del user'});
        }
       
        Users.findOne({email : userEmail, password : userPsw})
        .then((foundUser) => 
        {
            if(foundUser)
            {
                let id = String(foundUser['_id']);
                var session = {"session" : true};

                //************************************
                const resultPassword = foundUser.password;

                if(resultPassword)
                {
                        //Token
                        const expiresIn = 24 * 60 * 60;
                        const accessToken = jwt.sign({ id: users._id}, SECRET_KEY, {
                            expiresIn: expiresIn
                        });

                }

                //let identifier = '75070144';

                console.log('EL EMAIL QUE LEGO FUE ESTE:',foundUser.email);
                console.log('LA CLAVE PARA ESE EMAIL ES ESTA:',foundUser.password);
                console.log('EL ID CONVERTIDO ES ESTA::', id);

                //******************Asignamos True a la Session del User Actual***********/
                //************************************************************************/

                Users.findByIdAndUpdate(id, session, {new:true})
                        .then((sessionUpdated) => 
                        {
                            if(sessionUpdated)
                            {
                                console.log('Sesion Actualizada OK - TRUE');

                                return res.status(200).send(
                                    {
                                        message: 'SESION ACTUALIZADA !!!',
                                        session: sessionUpdated
                                    });
                        
                            }
                    })
                    .catch((error) => 
                    {
                        console.log(error);

                        return res.status(400).send(
                            {
                                message: 'ID-Proyecto NO pudo ser Encontrado o Modificado en la BD !!',
                            });

                    });

                //************************************************************************/
                //************************************************************************/
                
            }
            else
            {
                return res.status(500).send(
                    {
                        message: 'Error Encontrado !!!'
                        //project: projectUpdated
                    });


            }

       })
       .catch((error) => 
       {
        console.log(error);

           return res.status(500).send(
            {
                message: 'Se presentó un error en la Operación de Consulta a la Base de Datos',
            });

       });

       

    },//Fin funcion getUser

    //**********************************************************************************************************


    //*****************************************************************

    //Creamos el metodo updateSessionUser - Modificar SESION USUARIO - TRUE
    updateSessionUser: function(req, res)
    {
        //let UserId = req.params.id;
        let body = req.body;
        console.log(body);

        var projectId = ("644047a3706f910ba29d12ea");
        //var update = req.body;

        var update = {"session" : true};


        //console.log(projectId);
        //console.log(req.params);
            
        if(projectId == null)
        {
            return res.status(404).send({message: 'Falta el ID del Proyecto'});
        }
       
        Users.findByIdAndUpdate(projectId, update, {new:true})
        .then((projectUpdated) => 
        {
            if(projectUpdated)
            {
                //console.log('ENCONTRADO OK 2000000');

                return res.status(200).send(
                    {
                        message: 'Modificaciòn fue Exitosa !!',
                        project: projectUpdated
                    });
        
            }
       })
       .catch((error) => 
       {
        console.log(error);

           return res.status(400).send(
            {
                message: 'ID-Proyecto NO pudo ser Encontrado o Modificado en la BD !!',
            });

       });


    },//Fin funcion updateSessionUser

    
    //*****************************************************************
    //Creamos el metodo CreateUser

    createUser: function(req, res, next)
    {//Inicio funcion CreateUser

        var user = new Users();
        var params = req.body;

        user.name = params.name;
        user.email = params.email;
        user.password = params.password;
        user.session = false;
       
    //*****************************************************************
            //Se Crea el Usuario en la BD MongoDB
            user.save().then(UserResult => 
            {
                //Response al FRONTEND

                return res.status(200).send(
                {
                    message: 'El Usuario fue Registrado EXITOSAMENTE !!',
                    user: UserResult
                });

            }).catch(error => 
                {
                    console.log(error);
                    return res.status(500).send('Server Error');

                });

                //Token
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: users._id}, SECRET_KEY, {
                    expiresIn: expiresIn
                });

    },//Fin funcion CreateUser 

    //*****************************************************************
    
};

module.exports = controller;