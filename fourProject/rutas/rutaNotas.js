var app = require('express');
var controlNotas = require('../control/controlNotas');
var api = app.Router();

//Rutas
api.post('/registrar', controlNotas.registrarNota);
api.post('/obtener-notas', controlNotas.obtenerNotas);
api.put('/actualizar-nota/:id', controlNotas.actualizarNota);
api.delete('/eliminar-nota/:id', controlNotas.eliminarNota);

module.exports = api;