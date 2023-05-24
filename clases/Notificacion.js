const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
idUsuario: String,
mensaje: String,
proyecto: String,
titulo: String,
fecha: String,
estatus: Number
});

const notificacion = mongoose.model('jb_notificacion', notificacionSchema);

module.exports = notificacion;
