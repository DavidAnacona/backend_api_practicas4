'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {
      Paciente.hasMany(models.Familiar, {
        foreignKey: 'documento_paciente',
        as: 'familiares'
      });
      Paciente.hasMany(models.Examen, {
        foreignKey: 'documento_paciente',
        as: 'examenes'
      });
      Paciente.hasMany(models.Foto, {
        foreignKey: 'idPaciente',
        as: 'fotos'
      });
      Paciente.hasOne(models.HistoriaMedica, {
        foreignKey: 'idPaciente',
        as: 'historiaMedica'
      });
    }
  }
  Paciente.init({
    documento: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    tipoDocumento: DataTypes.STRING,
    telefonoContacto: DataTypes.INTEGER, 
    telefonoEmergencia: DataTypes.INTEGER, 
    correo: DataTypes.STRING, 
    idEspecialidad: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'Paciente' 
  });
  return Paciente;
}