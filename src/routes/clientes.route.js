const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.verificarJWT, clientesController.index);
router.get('/:id', authMiddleware.verificarJWT, clientesController.getById);
router.post('/', authMiddleware.verificarJWT, clientesController.create);
router.delete('/:id', authMiddleware.verificarJWT, clientesController.delete);
router.patch('/:id', authMiddleware.verificarJWT, clientesController.updateParcial);
router.put('/:id', authMiddleware.verificarJWT, clientesController.updateCompleto);


module.exports = router;