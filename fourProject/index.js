var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3978;

mongoose.connect('mongodb://127.0.0.1:27017/proyecto', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
    app.listen(port, function(){
        console.log('Servidor corriendo en puerto ' + port);
    })
  })
  .catch((error) => {
    console.log('Error al conectar a MongoDB:', error);
  });
