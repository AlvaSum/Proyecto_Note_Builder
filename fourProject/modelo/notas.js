'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquemaNota = Schema({
    id_user: String,
    titulo: String,
    descripcion: String,
    fecha: Date,
    categoria: String
});

module.exports = mongoose.model('Notas', esquemaNota);