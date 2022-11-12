"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("placas", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      numPlaca: { type: Sequelize.STRING(10), allowNull: false, unique: true },
      activa: { type: Sequelize.BOOLEAN, allowNull: false },
      fechaAlta: { type: Sequelize.DATE, allowNull: false },
      entidad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "entidades",
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
    await queryInterface.dropTable("placas");
  },
};
