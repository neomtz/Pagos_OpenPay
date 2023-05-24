require('../clases/Conexion'); // importa el archivo de conexión
var express = require('express');
const fs = require('fs');
var moment = require('moment');
const jb_tarjeta = require('../clases/Tarjeta');
var router = express.Router();

router.post('/', function (req, res, next) {
    var source1 = req.query.source1; //$_GET
    var source2 = req.query.source2;
    var server = {};

    if (source1 == 'tarjeta') {
        if (source2 == 'gettarjeta') {
            jb_tarjeta.find({"idUsuario": req.body.source }, function (err, docs) {
                if (err) {
                    console.log(err);
                }

                else {
                    server = docs;
                    res.send(server);
                }
            });
        }}
});
module.exports = router;
