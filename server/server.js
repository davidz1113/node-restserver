require('./config/config');

const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const path = require('path');


const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//habilitar la carpeta public para poder acceder 

app.use(express.static(path.resolve(__dirname, '../public')));



//usar las rutas de otro archivo
//significa llamar todo el codigo de usuarios.js de las rutas y ejecutarlo aqui.
app.use(require('./routes/index'));


//conexion a base de datos
//parametro de base de datos, url, puerto, nombre base de datos
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw new err;

    console.log('Base de datos Online')

});



app.listen(process.env.PORT, () => {
    console.log('ecuchando puerto 3000');
});