const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "marcas",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      clave: {
        type: DataTypes.STRING(4),
        allowNull: false,
        validate: {
          isAlpha: true,
          isUppercase: true,
        },
      },
      descripcion: { type: DataTypes.STRING(40), allowNull: false },
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
      },
    }
  );
