const express = require('express');
const router = express.Router();
const especialidadController = require('../controllers/especilidad.controller')

router.post('/crear', especialidadController.crearEspecialidad);
router.get('/mostrar', especialidadController.mostrarEspecialidad);
router.delete('/borrar/:id', especialidadController.borrarEspecialidad);
router.patch('/editar/:id', especialidadController.editarEspecialidad);

module.exports = router;