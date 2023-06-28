'use strict'
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
var rutasUsuario = require('./rutas/rutaUsuarios.js');
var rutasNotas = require('./rutas/rutaNotas.js');
var rutasCategorias = require('./rutas/rutaCategorias.js');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/usuarios', rutasUsuario);
app.use('/api/notas', rutasNotas);
app.use('/api/categorias', rutasCategorias);

module.exports = app;

//Para bajar una versión de una dependencia es con
//uninstall, para subir una versión específica se utiliza
//npm i mongoose@6.0.2
