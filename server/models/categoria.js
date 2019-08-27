const mongose = require('mongoose');
const Schema = mongose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: [true, 'La descripción es necesaria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario' //relacion de la entidad usuario
    }
})


module.exports = mongose.model('Categoria', categoriaSchema);