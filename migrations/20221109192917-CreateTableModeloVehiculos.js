"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vehiculos", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      anio: { type: Sequelize.INTEGER(4), allowNull: false },
      numSerie: { type: Sequelize.STRING(40), allowNull: false, unique: true },
      tipo: { type: Sequelize.STRING(40), allowNull: false },
      modelo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "modelos",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      placa_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "placas",
          key: "id",
        },
        onDelete: "CASCADE",
        unique: true,
        allowNull: false,
      },
      propietario_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "propietarios",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vehiculos");
  },
};
