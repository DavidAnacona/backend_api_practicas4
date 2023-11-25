'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Especialista extends Model {
    static associate(models) {
      Especialista.belongsTo(models.Especialidad, {
        foreignKey: 'id_especialidad', // Corrected to match the diagram
        as: 'especialidad'
      });
    }
  }
  Especialista.init({
    documento: DataTypes.STRING, // Assuming it's a STRING based on your diagram
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    tipo_documento: DataTypes.STRING, // Changed to match your diagram
    id_especialidad: DataTypes.INTEGER, // Foreign key corrected to match your diagram
    titulo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Especialista',
    tableName: 'Especialista' // Assuming plural for table name to follow conventions
  });
  return Especialista;
};