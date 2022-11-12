const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const permission = require("../middlewares/permission");

// Get all placas
router.get("/", permission("ADM", "USR"), async (req, res) => {
  return await sequelize.models.placas
    .findAndCountAll()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: "Error", data: err }));
});

// Creating a new placa
router.post("/", permission("ADM", "USR"),async (req, res) => {
  const { body } = req;
  try {
    const placa = await sequelize.models.placas.create({
      numPlaca: body.numPlaca,
      activa: body.activa,
      fechaAlta: body.fechaAlta,
      entidad_id: body.entidad_id,
    });
    await placa.save();
    return res.status(201).json({ data: placa });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Update placa by id
router.put("/:id", permission("ADM", "USR"),async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const placa = await sequelize.models.placas.findByPk(id);
    if (!placa) {
      return res.status(404).json({ code: 404, message: "Placa not found" });
    }
    const updatedPlaca = await placa.update({
        numPlaca: body.numPlaca,
        activa: body.activa,
        fechaAlta: body.fechaAlta,
        entidad_id: body.entidad_id,
    });
    return res.json({ data: updatedPlaca });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Delete a placa by id
router.delete('/:id', permission("ADM", "USR"), async (req, res) => {
  const { params: { id } } = req;
  const placa = await sequelize.models.placas.findByPk(id);
  if (!placa) {
    return res.status(404).json({ code: 404, message: 'Placa not found' });
  }
  await placa.destroy();
  return res.json({ message: 'Placa deleted' });
});

module.exports = router;
