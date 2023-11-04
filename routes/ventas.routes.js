const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/venta.controller');

// Ruta para obtener una lista paginada de ventas
router.get('/ventas', ventasController.getVentas);

// Ruta para crear una nueva venta
router.post('/ventas', ventasController.createVenta);

// Ruta para actualizar una venta por ID
router.put('/ventas/:id', ventasController.updateVenta);

// Ruta para eliminar una venta por ID (eliminación lógica)
router.delete('/ventas/:id', ventasController.deleteVenta);

// Obtener una venta por ID
router.get('/ventas/:id', ventasController.getVentaPorId);



module.exports = router;
