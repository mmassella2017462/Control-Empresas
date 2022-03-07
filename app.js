const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS
const UsuarioRutas = require('./src/routes/usuario.routes');
const EmpRutas = require('./src/routes/empleado.route');

// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());


// CARGA DE RUTAS localhost:3000/api/obtenerProductos
app.use('/api', UsuarioRutas,EmpRutas);


module.exports = app;