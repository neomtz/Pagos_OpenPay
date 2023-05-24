const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
idUsuario: String,
id_tarjeta: String,
id_transaccion: String,
id_operacion: String,
fecha: String,
estatus: Number
});

const transaccion = mongoose.model('jb_transaccion', transaccionSchema);

module.exports = transaccion;
