const Paciente = require('../models').Paciente;

exports.crearPaciente = (req, res) => {
    Paciente.create(req.body)
        .then(datos => {
            res.status(200).json({datos: datos})
        })
        .catch(error => {
            res.status(500).json({error: 'Error al crear una paciente'})
        })
}

exports.mostrarPaciente = (req, res) => {
    Paciente.findAll({})
        .then(datos => {
            res.status(200).json({ datos: datos });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al mostrar las paciente' });
        });
};

exports.editarPaciente = (req, res) => {
    Paciente.update(req.body, {
        where: { id: req.params.id }
    })
        .then(datos => {
            res.status(200).json({ datos: datos });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al editar el paciente' });
        });
};

exports.borrarPaciente = (req, res) => {
    Paciente.destroy({
        where: { id: req.params.id }
    })
        .then(datos => {
            res.status(200).json({ datos: datos });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar el paciente' });
        });
};