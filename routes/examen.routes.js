// examen.routes.js
const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examen.controller');

router.post('/crear/:id/:nombre', examenController.crearExamen);
router.get('/mostrar', examenController.mostrarExamen);

module.exports = router;
