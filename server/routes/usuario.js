const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

//llamar al modelo que es el esquema de la base de datos mongo
const Usuario = require('../models/usuario');



app.get('/usuario', function(req, res) {
    res.json('get Usuario')
});

//funcion de agregar un nuevo usuario
app.post('/usuario', function(req, res) {
    let body = req.body;

    //llammar el new usuario para psarle los datos al modelo de mongo
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //encriptacion de la contraseña mediante la libreria de bcryp de un solo camino (es decir, solo se puede encriptar y no desencriptar)
        role: body.role
    })

    //save-> palabra reservada de mongo para entrar en el insertar un objeto
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

});

//metodo para actualizar un usuario (:id, para recibir por parametro el id del usuario...)
app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    //metodo del modelo SCHEMA del usuario que se encarga de actualizar
    //automaticamente mediante el id, devuelve un error o un callBack
    Usuario.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


});
app.delete('/usuario', function(req, res) {
    res.json('delete Usuario')
});


module.exports = app;