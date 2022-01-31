'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prestamos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigoLibro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model : "libros",
          key : "id"
        }
      },
      fechaEmision: {
        type: Sequelize.DATE
      },
      fechaDevolucion: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('prestamos');
  }
};