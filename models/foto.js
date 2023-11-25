'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Foto.belongsTo(models.Paciente, {
        foreignKey: 'idPaciente', // Corrected to match your diagram
        as: 'paciente'
      });
    }
  }
  Foto.init({
    nombreImagen: DataTypes.STRING,
    urlImagen: DataTypes.STRING,
    idPaciente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Foto',
    tableName: 'Foto'
  });
  return Foto;
};