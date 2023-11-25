const express = require('express');
const router = express.Router();
const especialistaController = require('../controllers/especialista.controller')

router.post('/crear', especialistaController.crearEspecialista);
router.get('/mostrar', especialistaController.mostrarEspecialista);
router.delete('/borrar/:id', especialistaController.borrarEspecialista);
router.patch('/editar/:documento', especialistaController.editarEspecialista);

module.exports = router;