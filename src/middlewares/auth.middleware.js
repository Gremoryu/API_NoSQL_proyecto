const jwt = require('jsonwebtoken');
const jwtSecret = 'mi-palabra-secreta';

const verificarJWT = (req, res, next) => {
    const token = req.get('Authorization');

    jwt.verify(token, jwtSecret, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: "error al validar token",
                error: err.message
            });
        }

        req.cliente = decode.cliente;
        next();
    })
};


module.exports = {
    verificarJWT
}