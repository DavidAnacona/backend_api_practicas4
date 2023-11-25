'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Familiar extends Model {
    static associate(models) {
      Familiar.belongsTo(models.Paciente, {
        foreignKey: 'documento_paciente', // Corrected to match your diagram
        as: 'paciente'
      });
    }
  }
  Familiar.init({
    documento: DataTypes.STRING, // Assuming it's a STRING based on your diagram
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    tipo_documento: DataTypes.STRING, // Changed to match your diagram
    documento_paciente: DataTypes.INTEGER, // Corrected foreign key to match your diagram
    url_foto: DataTypes.STRING // Assuming you want to keep this field
  }, {
    sequelize,
    modelName: 'Familiar',
    tableName: 'Familiar' // Assuming plural for table name to follow conventions
  });
  return Familiar;
};