const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();
let Producto = require('../models/producto');

/**
 * ===================================
 * Obtener todos los productos
 * ===================================
 */

app.get('/producto', verificaToken, (req, res) => {
    // traer los productos
    // populate: usuario categoria
    // paginado

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //dentro de find({ aqui van los filtros, ejemplo google:true // todos los usuarios que tengan una cuenta de google })
    //Segundo parametro para excluir o traer solo los atributos que necesito de la base de datos.
    Producto.find({ disponible: true }, 'nombre precioUni descripcion categoria usuario disponible')
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email') //para traer info de otras tablas
        .populate('categoria', 'descripcion') //para traer info de otras tablas
        .populate()
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //al igual que en el find, dentro de los {} van las condiciones o filtros
            Producto.count({ disponible: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    productos,
                })
            });


        });

});

/**
 * ===================================
 * Obtener un producto por id
 * ===================================
 */

app.get('/producto/:id', verificaToken, (req, res) => {
    // populate: usuario categoria
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
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
                        message: 'EL id no es correcto'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            })
        })
        .populate('usuario', 'nombre email') //para traer info de otras tablas
        .populate('categoria', 'descripcion') //para traer info de otras tablas

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