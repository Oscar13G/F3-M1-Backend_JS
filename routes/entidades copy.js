const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");

// Get all entidades
router.get("/", async (req, res) => {
  return await sequelize.models.entidades
    .findAndCountAll()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: "Error", data: err }));
});

// Creating a new entidad
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const entidad = await sequelize.models.entidades.create({
      clave: body.clave,
      nombre: body.nombre,
    });
    await entidad.save();
    return res.status(201).json({ data: entidad });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Update entidad by id
router.put("/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const entidad = await sequelize.models.entidades.findByPk(id);
    if (!entidad) {
      return res.status(404).json({ code: 404, message: "Entidad not found" });
    }
    const updatedEntidad = await entidad.update({
      clave: body.clave,
      nombre: body.nombre,
    });
    return res.json({ data: updatedEntidad });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Delete a entidad by id
router.delete('/:id', async (req, res) => {
  const { params: { id } } = req;
  const entidad = await sequelize.models.entidades.findByPk(id);
  if (!entidad) {
    return res.status(404).json({ code: 404, message: 'Entidad not found' });
  }
  await entidad.destroy();
  return res.json({ message: 'Entidad deleted' });
});

module.exports = router;
