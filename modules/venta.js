const { Schema, model } = require("mongoose");

const ventaSchema = new Schema({
  ref: {
    type: String,
    required: [true, "La referencia es requerida"],
  },
  localField: {
    type: String
  },
  // Campos de auditoría
  created_at: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
  },
  updated_at: {
    type: Date,
  },
  updated_by: {
    type: String,
  },
  // Eliminación lógica
  deleted: {
    type: Boolean,
    default: false,
  },
  deleted_at: {
    type: Date,
  },
  deleted_by: {
    type: String,
  },
});

//middleware para actualizar la fecha de actualización y el usuario al guardar
ventaSchema.pre("save", function (next) {
  this.updated_at = new Date();
  next();
});

//middleware para la eliminación lógica
ventaSchema.pre("findOneAndUpdate", function () {
  this._update.updated_at = new Date();
});

const Venta = model("Venta", ventaSchema);

module.exports = Venta;
