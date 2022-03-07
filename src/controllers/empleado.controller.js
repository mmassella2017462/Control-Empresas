const Empr = require('../models/empresa.model');

function registrarEmpleado(req, res) {
   
    var parametros = req.body;
    var modeloEmpresa = new Empr();
   

    if (parametros.nombre) {
        modeloEmpresa.nombre = parametros.nombre;
        modeloEmpresa.apellido = parametros.apellido;
        modeloEmpresa.puesto = parametros.puesto;
        modeloEmpresa.departamento = parametros.departamento;
        modeloEmpresa.id_empre = req.user.sub;

        modeloEmpresa.save((err, empleadoGuardado) => {
            if (err) return res.status(400).send({ mensaje: 'Error en la peticion' });
            if (!empleadoGuardado) return res.status(404).send({ mensaje: 'Error al agregar el Empleado' });
            return res.status(200).send({ empleado: empleadoGuardado });
        })

    } else {
        return res.status(404).send({ mensaje: 'Debe enviar los parametros obligatorios' })
    }

}

function editarEmpleado(req, res) {
    var logeado = req.user;
    var parametros = req.body;
    var empleado = req.params.idEmpl;

    Empr.findOne({ _id: empleado, id_empre: logeado.sub }, (err, empresaEncontrada) => {
        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: "No puedes editar empleados que no sean de su empresa" });
        }
        Empr.findByIdAndUpdate(empleado, parametros, { new: true },
            (err, empleadoActualizado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!empleadoActualizado) return res.status(500).send({ mensaje: 'Error al editar el empleado' });

                return res.status(200).send({ empleado: empleadoActualizado })
            }
        );
    }
    )
}


function eliminarEmpleado(req, res) {
    var logeado = req.user;
    var empleado = req.params.idEmpl;


    Empr.findOne({ _id: empleado, id_empre: logeado.sub },
        (err, empresaEncontrada) => {

            if (!empresaEncontrada) {
                return res.status(400).send({ mensaje: 'No puedes eliminar empleados que no pertenezcan a su Empresa' });
            }

            Empr.findByIdAndDelete(empleado, (err, empleadoEliminado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                if (!empleadoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar este empleado' });

                return res.status(200).send({ mensaje: 'El empleado que se elimino es', empleadoEliminado })
            });
        }
    )
}


function visualizarEmpleados(req, res) {


    Empr.findOne({ id_empre: req.user.sub }, (err, empresaEncontrada) => {


        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: 'No puedes ver empleados que no sean de su empresa' });
        }
        Empr.find({}, (err, empleadosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
            if (!empleadosEncontrados) return res.status(500).send({ mensaje: 'No se pudo obtener sus empleados' })

            return res.status(200).send({ Empleados: empleadosEncontrados })
        });
    }
    )

}


function empleadoId(req, res) {
    const empleado = req.params.idEmpl;

    Empr.findOne({ _id: empleado, id_empre: req.user.sub }, (err, empresaEncontrada) => {
        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: "No puedes ver empleados de otra empresa" });
        }
        Empr.find( { _id: empleado }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'No se pudo obtener al empleado' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        );
    }
    )
}


function empleNombre(req, res) {
    var parametros = req.body;
    const logeado = req.user;

    Empr.findOne({  id_empre: logeado.sub }, (err, empresaEncontrada) => {
        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: 'no puedes ver empleados de otra empresa' });
        }
        Empr.find({ nombre: { $regex: parametros.nombre, $options: "i" } }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar el nombre del empleado' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        );
    }
    )

}

function busPuesto(req, res) {
    var parametros = req.body;
    const logeado = req.user;

    Empr.findOne({  id_empre: logeado.sub }, (err, empresaEncontrada) => {

        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: 'no puedes ver empleados de otra empresa' });
        }
        Empr.find({ puesto: { $regex: parametros.puesto, $options: "i" } }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empleados por puesto o cargo' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        );
    }
    )

}

function BusqDepa(req, res) {
    var parametros = req.body;
    const logeado = req.user;

    Empr.findOne({  id_empre: logeado.sub }, (err, empresaEncontrada) => {

        if (!empresaEncontrada) {
            return res.status(400).send({ mensaje: 'no puedes ver empleados de otra empresa' });
        }
        Empr.find({ departamento: { $regex: parametros.departamento, $options: "i" } }, (err, empleadoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!empleadoEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empleados por departamentos' });

            return res.status(200).send({ empleado: empleadoEncontrado })
        }
        );
    } 
    )

}




module.exports = {
 registrarEmpleado,
 editarEmpleado,
 eliminarEmpleado,
 visualizarEmpleados,
 empleadoId,
 empleNombre,
 busPuesto,
 BusqDepa,
    
}