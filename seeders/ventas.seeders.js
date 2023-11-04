const Venta = require('../models/venta'); // Asegúrate de que la importación del modelo sea correcta

// Crear ventas de prueba
const crearVentasDePrueba = async () => {
  const ventasDePrueba = [
    {
      ref: 'Venta1',
      localField: 'Local1',
      created_by: 'Usuario1',
    },
    {
      ref: 'Venta2',
      localField: 'Local2',
      created_by: 'Usuario2',
    },
    // Agrega más ventas de prueba según sea necesario
  ];

  await Venta.create(ventasDePrueba);
};

module.exports = crearVentasDePrueba;
