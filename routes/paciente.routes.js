const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/paciente.controller')

router.post('/crear', pacienteController.crearPaciente);
router.get('/mostrar', pacienteController.mostrarPaciente);
router.delete('/borrar/:id', pacienteController.borrarPaciente);
router.patch('/editar/:id', pacienteController.editarPaciente);

module.exports = router;