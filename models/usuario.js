var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs')

var usuarioSchema = Schema({
  nombre: {type: String, required: true},
  correo: {type: String, required: true},
  password: {type: String, required: true},
});

usuarioSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

usuarioSchema.methods.matchPassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('usuario', usuarioSchema);
