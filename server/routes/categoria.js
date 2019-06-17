const express = require('express');

let { verificaToken } = require('../middlewares/autenticacion')

let app = express();


let Categoria = require('../models/categoria');

/**
 * =========================
 * Mostrar todas las categorias
 * =========================
 */

app.get('/categoria', (req, res) => {

})


/**
 * =========================
 * Mostrar las categorias por ID
 * =========================
 */


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
        usuario: req.usuario._id
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

module.exports = app;