require("dotenv").config();
const express = require("express");
const router = express.Router();
const sequelize = require("../config/db");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { body } = req;

  try {
    const usuario = await sequelize.models.usuarios.findOne({
      where: { email: body.email },
    });
    if (!usuario) return res.status(401).json({ message: "Unauthorized" });
    if (!usuario.validPassword(body.password))
    return res.status(401).json({ message: "Invalid credentials!" });
    
    console.log(usuario.id);

    const token = jwt.sign(
      { usuarioId: usuario.id },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: process.env.JWT_EXPIRESIN,
      }
    );
    console.log(token);
    return res.json({ message: "Athenticated successfully!", token });
  } catch (error) {
    res.status(400).json({ message: "Error", info: "Sin datos", data: error, jwtS: process.env.JWT_SECRETKEY, jwtE: process.env.JWT_EXPIRESIN });
  }
});

router.post("/signup", async (req, res) => {
  const { body } = req;

  try {
    let usuario = await sequelize.models.usuarios.findOne({
      where: { email: body.email },
    });
    let rol = await sequelize.models.roles.findOne({
      where: { clave: 'USR' },
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
