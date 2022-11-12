const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");

// Get all propietarios
router.get("/", async (req, res) => {
  return await sequelize.models.propietarios
    .findAndCountAll()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: "Error", data: err }));
});

// Creating a new propietario
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const propietario = await sequelize.models.propietarios.create({
      nombre: body.nombre,
      apPaterno: body.apPaterno,
      apMaterno: body.apMaterno,
      email: body.email,
      rfc: body.rfc,
    });
    await propietario.save();
    return res.status(201).json({ data: propietario });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Update propietario by id
router.put("/:id", async (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const propietario = await sequelize.models.propietarios.findByPk(id);
    if (!propietario) {
      return res
        .status(404)
        .json({ code: 404, message: "Propietario not found" });
    }
    const updatedPropietario = await propietario.update({
      nombre: body.nombre,
      apPaterno: body.apPaterno,
      apMaterno: body.apMaterno,
      email: body.email,
      rfc: body.rfc,
    });
    return res.json({ data: updatedPropietario });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

// Delete a propietario by id
router.delete("/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  const propietario = await sequelize.models.propietarios.findByPk(id);
  if (!propietario) {
    return res
      .status(404)
      .json({ code: 404, message: "Propietario not found" });
  }
  await propietario.destroy();
  return res.json({ message: "Propietario deleted" });
});

module.exports = router;
