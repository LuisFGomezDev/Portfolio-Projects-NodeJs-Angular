'use strict'

var express = require('express');

var ProjectController = require('../controllers/project');
var UsersController = require('../controllers/users');

var router = express.Router();

//Configuracion del Multipart para poder subir imagenes a la carpeta Upload
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads'});

//********************RUTAS PARA LA CLASE PROJECT***************************/
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.put('/project/:id?', ProjectController.updateProject);

router.delete('/project/:id?', ProjectController.deleteProject);

router.get('/projects', ProjectController.getProjects);

router.post('/upload-image/:id?', multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

//********************RUTAS PARA LA CLASE USERS***************************/
router.get('/users/:email/:psw', UsersController.getLoginUser);
//router.post('/updateSessionUser', UsersController.updateSessionUser);

//************************************************************************/

router.post('/register', UsersController.createUser);
router.get('/login', UsersController.getLoginUser);

//************************************************************************/

module.exports = router;