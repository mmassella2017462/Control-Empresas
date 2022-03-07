const Usuario = require('../models/usuarios.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jtw');


function RegistrarAd(req, res) {
    var usuarioModel = new Usuario();

    usuarioModel.nombre='Admin';
    usuarioModel.usuario = 'Admin';
    usuarioModel.email = 'adminsitracion@gmail.com';
    usuarioModel.rol = 'ADMIN';

    Usuario.find({ email : 'adminsitracion@gmail.com' }, (err, usuarioEncontrado) => {
        if ( usuarioEncontrado.length == 0 ) {

            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                usuarioModel.password = passwordEncriptada;

                usuarioModel.save((err, usuarioGuardado) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' });
                    if(!usuarioGuardado) return res.status(500)
                        .send({ mensaje: 'Error al agregar el Usuario'});
                    
                    return res.status(200).send({ usuario: usuarioGuardado });
                });
            });                    
        } else {
            return res.status(500)
                .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
        }
    })
    
}



//Registro de una nueva Empresa
function RegistrarUsuario(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuario();

    if(parametros.usuario &&  
        parametros.email && parametros.password) {
            usuarioModel.nombre = parametros.nombre;
            usuarioModel.usuario = parametros.usuario;
            usuarioModel.email = parametros.email;
            usuarioModel.rol = 'EMPRESA';
            

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioModel.password = passwordEncriptada;

                        usuarioModel.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}



function EditarUsuario(req, res) {
    var idUser = req.params.idUser;
    var parametros = req.body;
    
    delete parametros.password

    Usuario.findByIdAndUpdate(idUser, parametros, { new : true } ,(err, usuarioEditado)=>{
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioEditado) return res.status(404)
            .send({ mensaje: 'Error al Editar el registro del Usuario' });

        return res.status(200).send({ usuario: usuarioEditado});
    })
}


function EliminarUsuario(req, res) {
    var idUser= req.params.idUser;

    Usuario.findByIdAndDelete(idUser, (err, usuarioEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(!usuarioEliminado) return res.status(500)
            .send({ mensaje: 'Error al eliminar el Usuario' })

        return res.status(200).send({ user: usuarioEliminado });
    })
}



function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            // COMPARO CONTRASENA SIN ENCRIPTAR CON LA ENCRIPTADA
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{//TRUE OR FALSE
                    // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
                    if ( verificacionPassword ) {
                        // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
                        if(parametros.Token === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }

                        
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })
}


function visualizarEmpresa(req, res) {
    Usuario.find({}, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al buscar empresa' })

        return res.status(200).send({ usuario: usuarioEncontrado })
    })
}






module.exports = {
    RegistrarAd,
    RegistrarUsuario,
    Login,
    EditarUsuario,
    EliminarUsuario,
    visualizarEmpresa
       
}

