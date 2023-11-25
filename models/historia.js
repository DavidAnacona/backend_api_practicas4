'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Historia extends Model {
    static associate(models) {
      Historia.belongsTo(models.Paciente, {
        foreignKey: 'idPaciente', // This matches your diagram
        as: 'paciente'
      });
    }
  }
  Historia.init({
    nombre: DataTypes.STRING, // Removed "Historia" to match your diagram
    urlPdf: DataTypes.STRING, // Matched casing to your diagram
    idPaciente: DataTypes.INTEGER // Matched your diagram
  }, {
    sequelize,
    modelName: 'HistoriaMedica',
    tableName: 'Historia' // Assuming plural for table name to follow conventions
  });
  return Historia;
};