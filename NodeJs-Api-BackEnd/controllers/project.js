'use strict'

const Project = require("../models/project"); //Esta linea carga el Schema Modelo del Project
var fs = require('fs'); //Libreria FileSystem para borrar un archivo del Sistema de directorios
const { exists } = require("../models/project");
var path = require('path');

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

    //Creamos el metodo Save Project - Grabar Proyecto Nuevo
    saveProject: function(req, res)
    {
    //*****************************************************************
        //var paramsKey = (Object.keys(params));
        //var paramsValue = (Object.values(params));
    //*****************************************************************
        var project = new Project();
        var params = req.body;

        var complete = 0;

        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.image = params.image;
       
    //*****************************************************************
        //Validacion de los Parametros recibidos por el POST
        /*
         paramsKey.forEach(function(field, index)
         {
              //console.log(`${index} : ${comida}[${index}]`);
              let keyCont = (`${field}`);
              let valueCont = paramsValue[index];
             
              if(keyCont == "" || valueCont == "")
              {
                complete++;
                console.log(complete);
                return res.status(500).send({message: 'Parametros Incompletos. ERROR !'});
              }
          });       
        */

          if(complete == 0)
          {
            //Se graban el Documento en la BD MongoDB
            project.save().then(ObjectResult => 
            {
                return res.status(200).send(
                {
                    message: 'El Proyecto fue guardado EXITOSAMENTE !!',
                    project: ObjectResult
                });

            }).catch(error => 
                {
                    console.log(error);
                });
          }

    },//Fin funcion saveProject


    //*****************************************************************

    //Creamos el metodo getProject - Para buscar un Proyecto Existente
    getProject: function(req, res)
    {
        var projectId = req.params.id;

        //console.log(projectId);
        //console.log(req.params);
            
        if(projectId == null)
        {
            return res.status(404).send({message: 'Falta el ID del Proyecto'});
        }
       
        Project.findOne({_id : projectId})
        .then((foundProject) => 
        {
            if(foundProject)
            {
                //console.log('ENCONTRADO OK 2000000');

                return res.status(200).send(
                    {
                        message: 'Consulta Exitosa !!',
                        project: foundProject
                    });
        
            }
       })
       .catch((error) => 
       {
        console.log(error);

           return res.status(400).send(
            {
                message: 'ID-Proyecto NO Encontrado en la BD !!',
            });

       });

    },//Fin funcion getProject


    //*****************************************************************

    //Creamos el metodo getProject - Para Listar los proyectos existentes
    getProjects: function(req, res)
    {
        Project.find()
        .then(function (foundProjects) 
        {
            if(foundProjects)
            {
                return res.status(200).send(
                    {
                        message: 'Consulta Exitosa !!',
                        projects: foundProjects
                    });
       
            }
            
        })
        .catch((error) => 
        {
         console.log(error);
 
            return res.status(500).send(
             {
                 message: 'Error al devolver el Listado de Proyectos',
             });
 
        });
 
    },//Fin funcion getProjects

    
    //*****************************************************************

    //Creamos el metodo updateProject - Modificar Proyecto Existente
    updateProject: function(req, res)
    {
        var projectId = req.params.id;
        var update = req.body;

        //console.log(projectId);
        //console.log(req.params);
            
        if(projectId == null)
        {
            return res.status(404).send({message: 'Falta el ID del Proyecto'});
        }
       
        Project.findByIdAndUpdate(projectId, update, {new:true})
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

    },//Fin funcion getProject

    //*****************************************************************

    //Creamos el metodo deleteProject - Borrar Proyecto
    deleteProject: function(req, res)
    {
        var projectId = req.params.id;
            
        if(projectId == null)
        {
            return res.status(404).send({message: 'Falta el ID del Proyecto'});
        }
       
        Project.findByIdAndDelete(projectId)
        .then((projectDelete) => 
        {
            if(projectDelete)
            {
                //console.log('ELIMINADO OK');

                return res.status(200).send(
                    {
                        message: 'Eliminación fue Exitosa !!',
                        project: projectDelete
                    });
        
            }
       })
       .catch((error) => 
       {
        console.log(error);

           return res.status(400).send(
            {
                message: 'ID-Proyecto NO pudo ser Encontrado o Eliminado en la BD !!',
            });

       });

    },//Fin funcion getProject


    //*****************************************************************

    //Creamos el metodo uploadImage - Cargar una imagen
    uploadImage: function(req, res)
    {
        var projectId = req.params.id;
        //var fileName = 'Imagen no subida...';

        if(projectId == null)
        {
            return res.status(404).send({message: 'Falta el ID del Proyecto'});
        }


        if(req.files)
        {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            //*******VALIDAMOS LA EXTENSION DEL ARCHIVO A CARGAR ANTES DE SUBIRLA*****
            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') 
            {
                //********************************************************************
                Project.findByIdAndUpdate(projectId, {image:fileName}, {new: true})
                        .then((err, projectUpdated) => 
                        {
                            if(err)
                            {
                                //return res.send({message: 'La imagen no ha podido cargarse'});
                                return res.status(500);

                                /*
                                res.send('OK')
                                return res.status(500).send(
                                    {
                                        message: 'La imagen no ha podido cargarse !!!',
                                        project: projectUpdated
                                    });
                                */
                            }

                            if(!projectUpdated)
                            {
                                return res.status(404).send(
                                    {
                                        message: 'El Proyecto NO EXISTE EN LA BD !!!',
                                        project: projectUpdated
                                    });
                     
                            }

                            return res.status(200).send(
                                {
                                    message: 'Imagen subida Exitosamente !!!',
                                    project: projectUpdated
                                });

                    })
                    .catch((err) => 
                    {
                        console.log(err);
                        
                        return res.status(500);
                        //return res.send({message: 'La imagen no ha podido cargarse'});

                    });
                //********************************************************************

                return res.status(200).send(
                    {
                        files: req.files
                    });


            }  //Fin If Verificarcion tipo de extension archivo  
            else
            //Borramos el archivo de la carpeta Uploads o Impedimos su Cargue
            {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La extension DEL ARCHIVO es INVALIDA'})
                });
            }
          

       }
       else 
       {
           return res.status(404).send(
            {
                message: 'ERROR: ID-Proyecto NO pudo ser Encontrado o la Imagen NO pudo subirse'
            });
       };

    },//Fin funcion UploadImage


    //*****************************************************************

    //Creamos el metodo getImageFile para devolver la imagen al Front End
    getImageFile: function(req, res)
    {
        var file = req.params.image;
        var path_file = './uploads/'+file;

        fs.exists(path_file, (exists) => 
        {
            if(exists)
            {
                return res.sendFile(path.resolve(path_file))
            }
            else
            {
                return res.status(404).send({
                    message: "No existe la imagen..."
                });
            }

        });

    }

};

module.exports = controller;