const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresaSchema = Schema({
        id_empre: { type: Schema.Types.ObjectId, ref: 'Usuarios'},
        nombre: String,
        apellido:String,
        puesto: String,
        departamento: String
 
});



module.exports = mongoose.model('Empresas',EmpresaSchema);

