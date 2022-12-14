require("dotenv").config();
const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { body } = req;

  if (!body.email && !body.password) {
    return res.status(400).json({ message: "Error", data: "Sin datos" });
  }

  const usuario = await sequelize.models.usuarios.findOne({
    where: { email: body.email },
  });
  if (!usuario) return res.status(401).json({ message: "Unauthorized" });
  if (!usuario.validPassword(body.password))
    return res.status(401).json({ message: "Invalid credentials!" });
  const token = jwt.sign({ usuarioId: usuario.id }, process.env.JWT_SECRETKEY, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  return res.json({ message: "Athenticated successfully!", token });

  res.status(400).json({ message: "Error", data: error });
});

router.post("/signup", async (req, res) => {
  const { body } = req;

  try {
    let usuario = await sequelize.models.usuarios.findOne({
      where: { email: body.email },
    });
    let rol = await sequelize.models.roles.findOne({
      where: { clave: "USR" },
    });

    // Validation for known is the usuario's email exists
    if (usuario) {
      return res
        .status(400)
        .json({ message: "this email is already registered" });
    }

    // Creating the usuario
    usuario = await sequelize.models.usuarios.create({
      nombre: body.nombre,
      apPaterno: body.apPaterno,
      email: body.email,
      password: body.password,
      rol_id: rol.id,
    });

    // Saving usuario
    await usuario.save();
    return res.json({ message: "Your account was created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error", data: error });
  }
});

module.exports = router;
