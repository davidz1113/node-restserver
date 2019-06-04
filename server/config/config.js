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


/**=====================
 * Vencimiento del token
 * ==================
 * 60 segundos
 * 60 minutos
 * 24 horas
 * 30 dias
 */

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/**=====================
 * sedd semilla de auth
 * ==================
 * configurar en heroku la semilla... con el heroku config: set
 */

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


/**================
 * Base de datos
 * Valida si esta en dessarrollo o en produccion, 
 * ==============
 */

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe'
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;