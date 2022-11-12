const sequelize = require("../config/db");

const permission = (...allowedRoles) => {
  return async (req, res, next) => {
    const { usuario } = req;
    // console.log(usuario.rol_id);

    try {
      const rol = await sequelize.models.roles.findByPk(usuario.rol_id);
      // console.log(rol.clave);

      if (usuario && allowedRoles.includes(rol.clave)) {
        return next(); // if type permission is allowed, so continue the request using the next middleware
      }
      return res.status(403).json({ message: "Forbidden" });
    } catch (error) {
      res.status(400).json({ message: "Error", data: error });
    }
  };
};

module.exports = permission;
