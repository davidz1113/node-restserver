const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

const _ = require('underscore');

//llamar al modelo que es el esquema de la base de datos mongo
const Usuario = require('../models/usuario');



app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //dentro de find({ aqui van los filtros, ejemplo google:true // todos los usuarios que tengan una cuenta de google })
    //Segundo parametro para excluir o traer solo los atributos que necesito de la base de datos.
    Usuario.find({ estado: true }, 'nombre email estado google role img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //al igual que en el find, dentro de los {} van las condiciones o filtros
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    usuarios,
                })
            });


        });

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
    //para la funcion pick, solo se le especifica el objeto, y en un arreglo, solo aquellos atributos que se quieran ser modificadas
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    //manera facil sin usar el underScore
    // let body = req.body;

    //forma de eliminar los campos que no se quiere que se modifiquen
    // por ejemplo el password no se debe modificar por parametro
    // la siguiente forma sirve para evitar que se cambien esos datos
    //con la palabra delete

    // delete body.google;
    // delete body.password;


    //metodo del modelo SCHEMA del usuario que se encarga de actualizar
    //automaticamente mediante el id, devuelve un error o un callBack
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
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


//para eliminar el usuario o un registro
app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    //se trabaja igual que el actualizar, se envia el id y el resto es un callback
    //comentado ya que para la eliminacion de los registros, ahora solo se cambia el estado
    //del registro de la base de datos.
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });
    // })
    //puede ser asi o simplemente el objeto
    /**
     * let objeto = {estado:false}
     */
    let body = _.pick({ estado: false }, ['estado']);
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
    })


});


module.exports = app;