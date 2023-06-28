const bcrypt = require('bcrypt');
var jwt = require('../service/jwt');
var usuario = require('../modelo/usuarios');
var newUser = new usuario();

function registrarUsuario(req, res) {
    var params = req.body; //recibe todos los datos por Por el Metodo POST
    newUser = new usuario();
    newUser.nombre = params.nombre;
    newUser.apellido = params.apellido;
    newUser.email = params.email;
    newUser.rol = 'ROLE_ADMIN';
    newUser.imagen = 'null';

    if (params.password) {
        bcrypt.hash(params.password, 10, function(err, hash) {
            newUser.password = hash;
            if (newUser.nombre != null && newUser.apellido != null && newUser.email != null) {
                //guardar el ususario en BD
                newUser.save()
                    .then((userSaved) => {
                        return res.status(200).send({ message: 'Usuario registrado exitosamente: ' + userSaved });
                    }).catch(error => {
                        return res.status(404).send({ message: 'Error al registrar el usuario' + error });
                    })
            } else {
                return res.status(200).send({ mesagge: 'Introduce todos los campos' });
            }
        });

    } else {
        return res.status(404).send({ mesagge: 'Introduce la contraseña' });
    }
}

function accesoUsuario(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    usuario.findOne({ email: email })
        .then(response => {
            if (!response) {
                return res.status(404).send({ mesagge: 'El usuario no existe' });
            }
            bcrypt.compare(password, response.password, function(err, check) {
                if (check) {
                    //devolver los datos del ususario logeado
                    console.log('coincide el password')
                    if (params.gethash) {
                        return res.status(200).send({
                            user_id: response._id,
                            email: response.email,
                            token: jwt.createToken(response)
                        });
                        //devolver un token de jwt
                    } else {
                        return res.status(200).send({ user: response });
                    }
                } else {
                    return res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                }
            });
        })
        .catch(error => {
            return res.status(500).send({ mesagge: 'Error en la peticion al servidor' });
        });
}

function consultarUsuario(req, res) {
    var userId = req.params.id;
    usuario.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
            return res.send({ user });
        })
        .catch((error) => {
            return res.status(500).send({ mesagge: 'Error al buscar el usuario' + error });
        });
}

function existeUsuario(req, res) {
    var params = req.body;
    var emailUser = params.email;
    usuario.find({ email: emailUser })
        .then(user => {
            if (user.length === 0) {
                return res.send({ message: 'NO' });
            } else {
                return res.send({ message: 'El usuario ya esta registrado' });
            }
        })
        .catch(error => {
            return res.status(500).send({ message: 'Error al encontrar el usuario' + error });
        })
}

function actualizarUsuario(req, res) {
    var userId = req.params.id;
    var updatedUser = req.body;

    usuario.findByIdAndUpdate(userId, updatedUser, { new: true })
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }

            res.send(user);
        })
        .catch((error) => {
            res.status(500).send({ mesagge: 'Error al actualizar el usuario' });
        });
}

function eliminarUsuario(req, res) {
    var userID = req.params.id;

    usuario.findByIdAndRemove(userID)
        .then((user) => {
            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }

            res.send({ message: 'Usuario eliminado exitosamente' });
        })
        .catch((error) => {
            res.status(500).send({ message: 'Error al eliminar el usuario' + error });
        });
}

function consultarTodos(req, res) {
    usuario.find()
        .then(response => {
            if (!response) {
                return res.status(404).send({ message: 'Ha ocurrido un error' });
            }
            res.send(response);
        })
        .catch(error => {
            res.status(500).send({ message: 'Error al encontrar los usuarios' + error });
        })
}

module.exports = {
    registrarUsuario,
    consultarUsuario,
    eliminarUsuario,
    actualizarUsuario,
    consultarTodos,
    accesoUsuario,
    existeUsuario
};