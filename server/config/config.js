//  =============================
//  Puerto
//  =============================
process.env.PORT = process.env.PORT || 3000;
//mongodb://localhost:27017/cafe


/**=====================
 * Entorno
 * ==================
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


/**================
 * Base de datos
 * Valida si esta en dessarrollo o en produccion, 
 * ==============
 */

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = 'mongodb+srv://death-stroke:op6IBi3p2uHxZqIG@cluster0-vclgj.mongodb.net/cafe'
}

process.env.URLDB = urlDB;