exports.verAdmin = function(req, res, next) {
    if(req.user.rol !== "ADMIN") return res.status(403).send({mensaje: "Solo puede acceder el Administrador"})
    
    next();
}

exports.verEmpresa = function(req, res, next) {
    if(req.user.rol !== "EMPRESA") return res.status(403).send({mensaje: "Solo puede acceder la Empresa"})
    
    next();
}