const Venta = require('../modules/venta');

// Obtener una lista paginada de ventas
exports.getVentas = async (req, res) => {
  const page = req.query.page || 1;
  const perPage = req.query.perPage || 10;

  try {
    const ventas = await Venta.find({ deleted: false })
      .skip((page - 1) * perPage)
      .limit(perPage);
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ventas' });
  }
};

// Crear una nueva venta
exports.createVenta = async (req, res) => {
  const nuevaVenta = new Venta(req.body);

  try {
    const ventaGuardada = await nuevaVenta.save();
    res.status(201).json(ventaGuardada);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear venta' });
  }
};

// Actualizar una venta por ID
exports.updateVenta = async (req, res) => {
  const { id } = req.params;

  try {
    const ventaActualizada = await Venta.findByIdAndUpdate(id, req.body, { new: true });
    res.json(ventaActualizada);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar venta' });
  }
};

// Eliminar una venta por ID (eliminación lógica)
exports.deleteVenta = async (req, res) => {
  const { id } = req.params;

  try {
    const ventaEliminada = await Venta.findByIdAndUpdate(id, { deleted: true, deleted_at: new Date() }, { new: true });
    res.json(ventaEliminada);
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar venta' });
  }
};
