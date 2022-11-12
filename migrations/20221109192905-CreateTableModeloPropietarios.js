"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("propietarios", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      nombre: { type: Sequelize.STRING(30), allowNull: false },
      apPaterno: { type: Sequelize.STRING(40), allowNull: false },
      apMaterno: { type: Sequelize.STRING(40), allowNull: false },
      email: { type: Sequelize.STRING(100), allowNull: false },
      rfc: { type: Sequelize.STRING(40), defaultValue: "Sin registro" },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("propietarios");
  },
};
