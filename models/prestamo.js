'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prestamo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.estudiante, {
        foreignKey: {id:'estudiante'},as : "Estudiante"
      });
    }
  }
  prestamo.init({
    codigoLibro: DataTypes.STRING,
    estudiante: DataTypes.STRING,
    fechaEmision: DataTypes.DATE,
    fechaDevolucion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'prestamo',
    tableName: 'prestamos',
  });
  return prestamo;
};