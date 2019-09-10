const express = require('express');

const fs = require('fs');

let app = express();

const path = require('path');


app.get('/imagen/:tipo/:img', (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = `./uploads/${tipo}/${img}`;

    let noImagePath = path.resolve(__dirname,'../assets/no-image.jpg');

    res.sendFile(noImagePath)


})


module.exports = app;