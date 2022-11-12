const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const Usuario = sequelize.define(
    "usuarios",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING(30), allowNull: false },
      apPaterno: { type: DataTypes.STRING(40), allowNull: false },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      rol_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "roles",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCreate: function (order, options) {
          order.createdAt = new Date();
          order.updatedAt = new Date();
        },
        beforeUpdate: function (order, options) {
          order.updatedAt = new Date();
        },
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
  Usuario.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Usuario;
};
