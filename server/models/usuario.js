const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//enumeracion para validar los roles permitidos
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

//esquema de la coleccion de la base de datos (tabla en bd relacional)
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

//este metodo sobreescribe la estructura del objeto de usuario, esto con el fin de evitar 
//devolver el campo y el valor de la contraseña en la respuesta json.
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}
//para configurar cuando caiga en un error por la validacion del unique validator
//en el {PATH} se muestra el campo, en este caso seria el email 
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

//el nombre en parentesis es el nombre del modelo
module.exports = mongoose.model('Usuario', usuarioSchema);