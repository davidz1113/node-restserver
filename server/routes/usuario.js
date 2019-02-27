const express = require('express');

const app = express();

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
        password: body.password,
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
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

});


app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    })

});
app.delete('/usuario', function(req, res) {
    res.json('delete Usuario')
});


module.exports = app;