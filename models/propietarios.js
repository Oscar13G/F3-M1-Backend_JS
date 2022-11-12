const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "propietarios",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: DataTypes.STRING(30), allowNull: false },
      apPaterno: { type: DataTypes.STRING(40), allowNull: false },
      apMaterno: { type: DataTypes.STRING(40), allowNull: false },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      rfc: { type: DataTypes.STRING(40), defaultValue: "Sin registro" },
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
