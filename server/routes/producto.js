const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

/**
 * ===================================
 * Obtener todos los productos
 * ===================================
 */

app.get('/producto', (req, res) => {
    // traer los productos
    // populate: usuario categoria
    // paginado
});

/**
 * ===================================
 * Obtener un producto por id
 * ===================================
 */

app.get('/producto/:id', verificaToken, (req, res) => {
    // populate: usuario categoria

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);
});

/**
 * ===================================
 * Crear un nuevo producto
 * ===================================
 */

app.post('/producto', verificaToken, (req, res) => {
    // Grabar el usuario
    //grabar una categoria del listado
    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id //si no esta el verifica token no se podra obtener el id del usuario
    });


    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    })
});

/**
 * ===================================
 * Actualizar producto
 * ===================================
 */

app.put('/producto/:id', verificaToken, (req, res) => {
    // Grabar el usuario
    //grabar una categoria del listado
    let body = req.body;
    const id = req.params.id;
    let producto = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        categoria: body.categoria,
        disponible: body.disponible,
        usuario: req.usuario._id //si no esta el verifica token no se podra obtener el id del usuario
    };

    Producto.findByIdAndUpdate(id, producto, { new: true, runValidators: true }, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        res.json({
            ok: true,
            categoria: productoDB
        })
    })
});

/**
 * ===================================
 * Eliminar un producto
 * ===================================
 */

app.delete('/producto/:id', (req, res) => {
    // solo desactivar con el campo disponible
    //

});

module.exports = app;