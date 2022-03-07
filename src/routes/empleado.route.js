const express = require('express');
const controlEmpresa = require('../controllers/empleado.controller');
const md_aut = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/validaciones');

const api = express.Router();


api.post('/registrarEmpleado', [md_aut.Auth, md_roles.verEmpresa], controlEmpresa.registrarEmpleado);
api.put('/editarEmpleado/:idEmpl', [md_aut.Auth, md_roles.verEmpresa], controlEmpresa.editarEmpleado);
api.delete('/eliminarEmpleado/:idEmpl', [md_aut.Auth, md_roles.verEmpresa], controlEmpresa.eliminarEmpleado);
api.get('/visualizarEmpleados',[md_aut.Auth, md_roles.verEmpresa], controlEmpresa.visualizarEmpleados);
api.get('/busquedaIdempleado/:idEmpl',[md_aut.Auth, md_roles.verEmpresa], controlEmpresa.empleadoId);
api.get('/busquedaEmpleado',[md_aut.Auth, md_roles.verEmpresa], controlEmpresa.empleNombre);
api.get('/busquedaDepartamento',[md_aut.Auth, md_roles.verEmpresa], controlEmpresa.BusqDepa);
api.get('/busquedaPuesto',[md_aut.Auth, md_roles.verEmpresa], controlEmpresa.busPuesto);
//api.get('/pdf',[md_aut.Auth, md_roles.verEmpresa], controlEmpresa.empleadosPdf);


module.exports = api;