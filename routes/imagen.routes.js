const express = require('express');
const router = express.Router();
const fotoController = require('../controllers/imagen.controller');

router.post('/subir/:idPaciente', fotoController.subirFoto);
router.get('/mostrar', fotoController.mostrarFotos);
router.delete('/borrar/:id', fotoController.borrarFoto);

module.exports = router;