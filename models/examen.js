'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {
    static associate(models) {
      Examen.belongsTo(models.Paciente, {
        foreignKey: 'documento_paciente', // Corrected to match your diagram
        as: 'paciente'
      });
    }
  }
  Examen.init({
    nombre: DataTypes.STRING, // Renamed to match your diagram
    urlPdf: DataTypes.STRING,
    documentoPaciente: DataTypes.INTEGER // Foreign key corrected to match your diagram
  }, {
    sequelize,
    modelName: 'Examen',
    tableName: 'Examen' // Assuming plural for table name to follow conventions
  });
  return Examen;
};