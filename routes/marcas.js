const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const permission = require("../middlewares/permission");

// Get all marcas
router.get("/", permission('ADM', 'USR'), async (req, res) => {
  return await sequelize.models.marcas
    .findAndCountAll()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: "Error", data: err }));
});

// Creating a new marca
router.post("/", permission('ADM'), async (req, res) => {
  const { body } = req;
  try {
    const marca = await sequelize.models.marcas.create({
      clave: body.clave,
      descripcion: body.descripcion,
    });
    await marca.save();
    return res.status(201).json({ data: marca });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Update marca by id
router.put("/:id", permission('ADM'), async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const marca = await sequelize.models.marcas.findByPk(id);
    if (!marca) {
      return res.status(404).json({ code: 404, message: "Marca not found" });
    }
    const updatedMarca = await marca.update({
      clave: body.clave,
      descripcion: body.descripcion,
    });
    return res.json({ data: updatedMarca });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Delete a marca by id
router.delete("/:id", permission('ADM'), async (req, res) => {
  const {
    params: { id },
  } = req;
  const marca = await sequelize.models.marcas.findByPk(id);
  if (!marca) {
    return res.status(404).json({ code: 404, message: "Marca not found" });
  }
  await marca.destroy();
  return res.json({ message: "Marca deleted" });
});

module.exports = router;
