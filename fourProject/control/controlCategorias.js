var categorias = require('../modelo/categorias');
var notas = require('../modelo/notas')
var newCategoria = new categorias();

function registrarCategoria(req, res) {
    var params = req.body;
    newCategoria = new categorias();
    newCategoria.id_user = params.id_user;
    newCategoria.titulo = params.titulo;

    if (newCategoria.id_user != null && newCategoria.titulo != null) {
        newCategoria.save()
            .then((categoriaSave) => {
                return res.status(200).send({ message: 'Categoría registrada exitosamente: ' + categoriaSave });
            }).catch(error => {
                return res.status(404).send({ message: 'Error al registrar la categoría' + error });
            })
    } else {
        return res.status(200).send({ mesagge: 'Introduce todos los campos' });
    }
}

function obtenerCategorias(req, res) {
    var params = req.body
    var idUser = params.user_id;
    categorias.find({ id_user: idUser })
        .then(response => {
            if (!response) {
                return res.status(404).send({ message: 'Ha ocurrido un error' });
            }
            return res.send(response);
        })
        .catch(error => {
            return res.status(500).send({ message: 'Error al encontrar las categorías' + error });
        })

}

function actualizarCategoria(req, res) {
    var categoriaID = req.params.id;
    var updatedCategoria = req.body;

    categorias.findByIdAndUpdate(categoriaID, updatedCategoria, { new: true })
        .then((categoria) => {
            if (!categoria) {
                return res.status(404).send({ message: 'Categoría no encontrada' });
            }

            res.send(categoria);
        })
        .catch((error) => {
            res.status(500).send({ mesagge: 'Error al actualizar la Categoría' + error });
        });
}

function eliminarCategoria(req, res) {
    var categoriaID = req.params.id;
    eliminarNotasCategoria(categoriaID)
    categorias.findByIdAndRemove(categoriaID)
        .then((categoria) => {
            if (!categoria) {
                return res.status(404).send({ message: 'Categoría no encontrada' });
            }

            res.send({ message: 'Categoría eliminada exitosamente' });
        })
        .catch((error) => {
            res.status(500).send({ message: 'Error al eliminar la categoría' + error });
        });
}

function eliminarNotasCategoria(id) {
    notas.deleteMany({ categoria: id })
        .then((result) => {
            if (result.deletedCount === 0) {
                return { message: 'No se encontraron registros con la categoría especificada' };
            }

            return { message: 'Registros eliminados exitosamente' };
        })
        .catch((error) => {
            return { message: 'Error al eliminar los registros' + error };
        });
}

module.exports = {
    registrarCategoria,
    obtenerCategorias,
    actualizarCategoria,
    eliminarCategoria
}