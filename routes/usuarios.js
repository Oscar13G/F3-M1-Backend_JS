const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const permission = require("../middlewares/permission");

// Get all usuarios
router.get("/", permission("ADM"), async (req, res) => {
  return await sequelize.models.usuarios
    .findAndCountAll()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: "Error", data: err }));
});

// Creating a new usuario
router.post("/", permission("ADM"), async (req, res) => {
  const { body } = req;
  try {
    const usuario = await sequelize.models.usuarios.create({
      nombre: body.nombre,
      apPaterno: body.apPaterno,
      email: body.email,
      password: body.password,
      rol_id: body.rol_id,
    });
    await usuario.save();
    return res.status(201).json({ data: usuario });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Update usuario by id
router.put("/:id", permission("ADM"), async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const usuario = await sequelize.models.usuarios.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ code: 404, message: "Usuario not found" });
    }
    const updatedUsuario = await usuario.update({
      nombre: body.nombre,
      apPaterno: body.apPaterno,
      email: body.email,
      password: body.password,
      rol_id: body.rol_id,
    });
    return res.json({ data: updatedUsuario });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Delete a usuario by id
router.delete("/:id", permission("ADM"), async (req, res) => {
  const {
    params: { id },
  } = req;
  const usuario = await sequelize.models.usuarios.findByPk(id);
  if (!usuario) {
    return res.status(404).json({ code: 404, message: "Usuario not found" });
  }
  await usuario.destroy();
  return res.json({ message: "Usuario deleted" });
});

module.exports = router;
