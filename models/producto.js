var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = Schema({
  tipo: String,
  nombre: String,
  color: String,
  imgurl: String,
  existencias: Number,
  precio: Number,
});

module.exports = mongoose.model('producto', productoSchema);
