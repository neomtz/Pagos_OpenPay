const express = require('express');
const path =require('path');
// const moment = require('moment');
const app = express();
const port = 5000;
// let now = moment();
const request = require('request');
var bodyParser = require('body-parser');
// var server;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var GET = require("./GET/index");
var POST = require("./POST/index");
app.use('/GET/', GET);
app.use('/POST/', POST);


// require('./clases/Conexion'); // importa el archivo de conexión
// comando para ejecutar el proyecto con nodemon
// npm run dev

app.use(express.static('www'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
