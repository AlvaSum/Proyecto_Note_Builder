'use strict'
var jwt = require('jwt-simple');
var momento = require('moment');
var claveSecretaInterna = 'BearerToken?1432?54-2}352}]523';

exports.createToken = function(user) {
    var payload = {
        sub: user._id, //id del registro de la base de datos de usuario
        name: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
        imagen: user.imagen,
        iat: momento().unix(), //fecha de creación del token
        exp: momento().add(30, 'days').unix //fecha de expiración
    };

    return jwt.encode(payload, claveSecretaInterna); //devolver el token codificado con payload, y clave secreta es codificar
    //los datos con una clave de acceso
};