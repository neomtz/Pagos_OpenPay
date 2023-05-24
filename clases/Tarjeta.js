const mongoose = require('mongoose');

const tarjetaSchema = new mongoose.Schema({
idUsuario: String,
idOpenPay: String,
numeroTarjeta: String,
nombre: String,
apellidos: String,
telefono: String,
correo: String,
aExpiracion: String,
mesExpiracion: String,
fecha: String,
estatus: Number
});

const tarjeta = mongoose.model('jb_tarjeta', tarjetaSchema);

module.exports = tarjeta;
