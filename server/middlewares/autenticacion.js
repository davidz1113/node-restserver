/**
 * ===============================
 * Verificar token
 * =============
 * consifg del middleware
 */

const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    let token = req.get('token'); //obtencion del header personalizado

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }
        //se especifica en la req aquellos valores que se quieren dar de respuesta para la obtencion del mismo
        req.usuario = decoded.usuario;
        next();
    });

}

/**
 * ===============================
 * Verificar admin Rol
 * =============
 * consifg del middleware
 */

let verificaAdmin_role = (req, res, next) => {

    let usuario = req.usuario;
    console.log(usuario);
    if (usuario.role != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: ' El usuario no es administrador '
            }
        })
    }

    // req.usuario = res.usuario;
    next();

}

module.exports = {
    verificaToken,
    verificaAdmin_role
}