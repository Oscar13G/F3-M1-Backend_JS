const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define(
    "vehiculos",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      anio: { type: DataTypes.INTEGER(4), allowNull: false },
      numSerie: { type: DataTypes.STRING(40), allowNull: false, unique: true },
      tipo: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          isIn: [["particular", "carga", "transporte"]],
        },
      },
      modelo_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "modelos",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      placa_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "placas",
          key: "id",
        },
        onDelete: "CASCADE",
        unique: true,
        allowNull: false,
      },
      propietario_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "propietarios",
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
