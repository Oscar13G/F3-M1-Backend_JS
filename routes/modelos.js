const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");

// Get all modelos
router.get("/", async (req, res) => {
  return await sequelize.models.modelos
    .findAndCountAll()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: "Error", data: err }));
});

// Creating a new modelo
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const modelo = await sequelize.models.modelos.create({
      marca_id: body.marca_id,
      nombre: body.nombre,
    });
    await modelo.save();
    return res.status(201).json({ data: modelo });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Update modelo by id
router.put("/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const modelo = await sequelize.models.modelos.findByPk(id);
    if (!modelo) {
      return res.status(404).json({ code: 404, message: "Modelo not found" });
    }
    const updatedModelo = await modelo.update({
      marca_id: body.marca_id,
      nombre: body.nombre,
    });
    return res.json({ data: updatedModelo });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Delete a modelo by id
router.delete("/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const modelo = await sequelize.models.modelos.findByPk(id);
  if (!modelo) {
    return res.status(404).json({ code: 404, message: "Modelo not found" });
  }
  await modelo.destroy();
  return res.json({ message: "Modelo deleted" });
});

module.exports = router;
