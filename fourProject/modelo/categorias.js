'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var esquemaCategoria = Schema({
    id_user: String,
    titulo: String,
});

module.exports = mongoose.model('Categoria', esquemaCategoria);