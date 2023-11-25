'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Especialidad extends Model {
    static associate(models) {
      Especialidad.hasMany(models.Especialista, {
        foreignKey: 'id_especialidad'
      });
    }
  }
  Especialidad.init({
    nombreEspecialidad: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'Especialidad',
    tableName: 'Especialidad' 
  });
  return Especialidad;
};