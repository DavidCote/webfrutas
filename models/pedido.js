var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pedidoSchema = Schema({
  nombreU: String,
  cantidad: Number,
  total: Number,
  direccion: String,
});

module.exports = mongoose.model('pedido', pedidoSchema);
