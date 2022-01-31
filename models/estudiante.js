'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estudiante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  estudiante.init({
    idEstudiante: DataTypes.STRING,
    user: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'estudiante',
    tableName: 'estudiantes',
  });
  return estudiante;
};