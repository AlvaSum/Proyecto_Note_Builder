var app = require('express');
var controlCategorías = require('../control/controlCategorias');
var api = app.Router();

//Rutas
api.post('/registrar', controlCategorías.registrarCategoria);
api.post('/obtener-categorias', controlCategorías.obtenerCategorias);
api.put('/actualizar-categoria/:id', controlCategorías.actualizarCategoria);
api.delete('/eliminar-categoria/:id', controlCategorías.eliminarCategoria);

module.exports = api;