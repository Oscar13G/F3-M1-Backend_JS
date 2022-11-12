const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "placas",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      numPlaca: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
        validate: {
          isUppercase: true,
        },
      },
      activa: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: { isIn: [[false, true]] },
      },
      fechaAlta: { type: DataTypes.DATE, allowNull: false },
      entidad_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "entidades",
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
      },
    }
  );
