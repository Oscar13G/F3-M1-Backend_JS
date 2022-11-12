const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");

// Get all vehiculos
router.get("/", async (req, res) => {
  return await sequelize.models.vehiculos
    .findAndCountAll()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: "Error", data: err }));
});

// Creating a new vehiculo
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const vehiculo = await sequelize.models.vehiculos.create({
      anio: body.anio,
      numSerie: body.numSerie,
      tipo: body.tipo,
      modelo_id: body.modelo_id,
      placa_id: body.placa_id,
      propietario_id: body.propietario_id,
    });
    await vehiculo.save();
    return res.status(201).json({ data: vehiculo });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Update vehiculo by id
router.put("/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const vehiculo = await sequelize.models.vehiculos.findByPk(id);
    if (!vehiculo) {
      return res.status(404).json({ code: 404, message: "Vehiculo not found" });
    }
    const updatedVehiculo = await vehiculo.update({
      anio: body.anio,
      numSerie: body.numSerie,
      tipo: body.tipo,
      modelo_id: body.modelo_id,
      placa_id: body.placa_id,
      propietario_id: body.propietario_id,
    });
    return res.json({ data: updatedVehiculo });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Delete a vehiculo by id
router.delete("/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const vehiculo = await sequelize.models.vehiculos.findByPk(id);
  if (!vehiculo) {
    return res.status(404).json({ code: 404, message: "Vehiculo not found" });
  }
  await vehiculo.destroy();
  return res.json({ message: "Vehiculo deleted" });
});

module.exports = router;
