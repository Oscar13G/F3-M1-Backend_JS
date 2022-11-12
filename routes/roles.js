const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");

// Get all roles
router.get("/", async (req, res) => {
  return await sequelize.models.roles
    .findAndCountAll()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: "Error", data: err }));
});

// Creating a new rol
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const rol = await sequelize.models.roles.create({
      clave: body.clave,
      descripcion: body.descripcion,
    });
    await rol.save();
    return res.status(201).json({ data: rol });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Update rol by id
router.put("/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const rol = await sequelize.models.roles.findByPk(id);
    if (!rol) {
      return res.status(404).json({ code: 404, message: "Rol not found" });
    }
    const updatedRol = await rol.update({
      clave: body.clave,
      descripcion: body.descripcion,
    });
    return res.json({ data: updatedRol });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Delete a rol by id
router.delete("/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const rol = await sequelize.models.roles.findByPk(id);
  if (!rol) {
    return res.status(404).json({ code: 404, message: "Rol not found" });
  }
  await rol.destroy();
  return res.json({ message: "Rol deleted" });
});

module.exports = router;
