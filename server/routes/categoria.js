const express = require('express');

let { verificaToken, verificaAdmin_role } = require('../middlewares/autenticacion')

let app = express();


let Categoria = require('../models/categoria');

/**
 * =========================
 * Actualizar una categoria
 * =========================
 */

app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let desCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, desCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })



})


/**
 * =========================
 * Eliminar las categorias por ID
 * Solo si tiene permiso de ROL admin
 * =========================
 */

app.delete('/categoria/:id', [verificaToken, verificaAdmin_role], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no exisate'
                }
            });
        }

        res.json({
            ok: true,
            message: 'Categoria borrada'
        })


    });
})


/**
 * =========================
 * Crear una nueva categoria
 * =========================
 */

app.post('/categoria', verificaToken, (req, res) => {
    //debe regresar la nueva categoria
    //req.usuario._id
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id //si no esta el verifica token no se podra obtener el id del usuario
    });


    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })

    })


});




/**
 * ========================
 * obtener todas las categorias
 * ========================
 */

app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion') //para ordenamiento
        .populate('usuario', 'nombre email') //para traer info de otras tablas
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            })
        })
})


/**
 * ========================
 * obtener categorias por id
 * ========================
 */

app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'EL id no es correcto'
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })

});

module.exports = app;