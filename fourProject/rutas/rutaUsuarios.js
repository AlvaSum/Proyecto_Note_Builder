var app = require('express');
var controlUsuario = require('../control/controlUsuarios');
var api = app.Router();

//Rutas
api.post('/registrar', controlUsuario.registrarUsuario);
api.post('/acceder', controlUsuario.accesoUsuario);
api.get('/consultar-usuario/:id', controlUsuario.consultarUsuario);
api.delete('/eliminar-usuario/:id', controlUsuario.eliminarUsuario);
api.put('/actualizar-usuario/:id', controlUsuario.actualizarUsuario);
api.get('/consultar-todos', controlUsuario.consultarTodos);
api.post('/existe-usuario', controlUsuario.existeUsuario);


/* api.post('/acceder', controlUsuario.accesoUsuario);
api.post('/actualizar-imagen-usuario/:id', [md_auth.validarAcceso, dir_fotos], controlUsuario.actualizarFoto);
api.get('/get-imagen-usuario/:imageFile', md_auth.validarAcceso, controlUsuario.getFoto);
*/

module.exports = api;