require("dotenv").config();
const { response } = require("express");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/db");

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  jwt.verify(authorization, process.env.JWT_SECRETKEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized!" });
    req.usuario = await sequelize.models.usuarios.findOne({
      where: { id: decoded.usuarioId },
    });

    next();
  });
};

module.exports = authenticate;
