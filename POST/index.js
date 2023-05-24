require('../clases/Conexion'); // importa el archivo de conexión
var express = require('express');
const fs = require('fs');
var moment = require('moment');
const jb_tarjeta = require('../clases/Tarjeta');
const jb_transaccion = require('../clases/Transaccion');
const jb_notificacion = require('../clases/Notificacion');
var router = express.Router();

router.post('/', function (req, res, next) {
    var server = {};
    var source1 = req.query.source1; //$_GET
    var source2 = req.query.source2;

    // INSERTAR DOCUMENTO EN LA TABLA jb_tarjeta
    if (source1 == 'patrimoniohoy')
    {
      if (source2 == 'settarjeta') {
            const Tarjeta = new jb_tarjeta({ idUsuario: req.body.source1, idOpenPay: req.body.source2, numeroTarjeta: req.body.source3, nombre: req.body.source4, apellidos: req.body.source5, telefono: req.body.source6, correo: req.body.source7, aExpiracion: req.body.source8, mesExpiracion: req.body.source9, fecha: moment().format('YYYY-MM-DD HH:mm:ss'), estatus: 0 });
            Tarjeta.save(function (err, doc) {
                if (err) {
                    server.status = 'error';
                    server.log = err;
                } else {
                    // console.log("Datos agregados: ", doc);
                    server.registro = doc;
                    server.status = 'ok';

                }
                res.json(server);
            });

        }
    }
    if (source1 == 'patrimoniohoy')
    {
      if (source2 == 'deltarjeta') {
            jb_tarjeta.deleteOne({ _id: req.body.source1 }, function (err, doc) {
                // console.log("ejecutandonse")
                if (err) {
                    // console.log(err);
                    server = err;
                    server.status = 'error';
                }

                else {
                    // console.log("Eliminado : ", doc);
                    server = doc;
                    server.status = 'ok';

                }
                res.send(server);
            });

        }
    }
    if (source1 == 'usuarios')
    {
        if (source2 == 'delusuariosid') {
            // console.log("eliminae")
            usuarios.deleteOne({ _id: req.body.source2 }, function (err, doc) {
                // console.log("ejecutandonse")
                if (err) {
                    // console.log(err);
                    server = err;
                    server.status = 'error';
                }

                else {
                    // console.log("Eliminado : ", doc);
                    server = doc;
                    server.status = 'ok';

                }
                res.send(server);
            });
        }
}
    // INSERTAR DOCUMENTO EN LA TABLA jb_transaccion
    if (source1 == 'patrimoniohoy')
    {
      if (source2 == 'settransaccion') {
            const Transaccion = new jb_transaccion({ idUsuario: req.body.source1, id_tarjeta: req.body.source2, id_transaccion: req.body.source3, id_operacion: req.body.source4, fecha: moment().format('YYYY-MM-DD HH:mm:ss'), estatus: 0 });
            Transaccion.save(function (err, doc) {
                if (err) {
                    server.status = 'error';
                    server.log = err;
                } else {
                    // console.log("Datos agregados: ", doc);
                    server.registro = doc;
                    server.status = 'ok';

                }
                res.json(server);
            });

        }
    }

    // CONTROLADOR PARA LAS NOTIFICACIONES
    if (source1 == 'patrimoniohoy')
    {
      if (source2 == 'setnotificaciones') {
            const Notificacion = new jb_notificacion({ idUsuario: req.body.source1, mensaje: req.body.source2, proyecto: req.body.source3, titulo: req.body.source4, fecha: moment().format('YYYY-MM-DD HH:mm:ss'), estatus: 0 });
            Notificacion.save(function (err, doc) {
                if (err) {
                    server.status = 'error';
                    server.log = err;
                } else {
                    server.registro = doc;
                    server.status = 'ok';

                }
                res.json(server);
            });

        }
    }
});
module.exports = router;
