'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class libro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  libro.init({
    codigo: DataTypes.STRING,
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'libro',
    tableName: 'libros',
  });
  return libro;
};