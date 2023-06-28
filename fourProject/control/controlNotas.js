var notas = require('../modelo/notas');
var newNota = new notas();

function registrarNota(req, res) {
    var params = req.body;
    newNota = new notas();
    newNota.id_user = params.id_user;
    newNota.titulo = params.titulo;
    newNota.descripcion = params.descripcion;
    var date = new Date();
    newNota.fecha = date.toISOString();
    newNota.categoria = params.categoria;

    if (newNota.id_user != null && newNota.titulo != null && newNota.descripcion != null) {
        if (newNota.categoria != null) {
            newNota.save()
                .then((noteSaved) => {
                    return res.status(200).send({ message: 'Nota registrada exitosamente: ' + noteSaved });
                }).catch(error => {
                    return res.status(404).send({ message: 'Error al registrar la nota' + error });
                })
        } else {
            return res.status(404).send({ message: 'Categoría no encontrada' })
        }
    } else {
        return res.status(200).send({ mesagge: 'Introduce todos los campos' });
    }
}

function obtenerNotas(req, res) {
    var params = req.body
    var idUser = params.id_user;
    var idCategoria = params.categoria;
    notas.find({ id_user: idUser, categoria: idCategoria })
        .then(response => {
            if (!response) {
                return res.status(404).send({ message: 'Ha ocurrido un error' });
            }
            return res.send(response);
        })
        .catch(error => {
            return res.status(500).send({ message: 'Error al encontrar las notas' + error });
        })

}

function actualizarNota(req, res) {
    var notaID = req.params.id;
    var updatedNote = req.body;

    notas.findByIdAndUpdate(notaID, updatedNote, { new: true })
        .then((note) => {
            if (!note) {
                return res.status(404).send({ message: 'Nota no encontrada' });
            }

            return res.send(note);
        })
        .catch((error) => {
            return res.status(500).send({ mesagge: 'Error al actualizar la nota' + error });
        });
}

function eliminarNota(req, res) {
    var noteID = req.params.id;

    notas.findByIdAndRemove(noteID)
        .then((note) => {
            if (!note) {
                return res.status(404).send({ message: 'Nota no encontrada' });
            }

            return res.send({ message: 'Nota eliminada exitosamente' });
        })
        .catch((error) => {
            return res.status(500).send({ message: 'Error al eliminar la nota' + error });
        });
}

module.exports = {
    registrarNota,
    obtenerNotas,
    actualizarNota,
    eliminarNota
}