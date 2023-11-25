const Especialista = require('../models').Especialista;

exports.crearEspecialista = (req, res) => {
    Especialista.create(req.body)
        .then(datos => {
            res.status(200).json({datos: datos})
        })
        .catch(error => {
            res.status(500).json({error: 'Error al crear una Especialista'})
        })
}

exports.mostrarEspecialista = (req, res) => {
    Especialista.findAll({})
        .then(datos => {
            res.status(200).json({ datos: datos });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al mostrar las Especialista' });
        });
};

exports.editarEspecialista = (req, res) => {
    Especialista.update(req.body, {
        where: { id: req.params.id }
    })
        .then(especialidad => {
            res.status(200).json({ datos: especialidad });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al editar la Especialista' });
        });
};

exports.borrarEspecialista = (req, res) => {
    Especialista.destroy({
        where: { id: req.params.id }
    })
        .then(especialidad => {
            res.status(200).json({ datos: especialidad });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la Especialista' });
        });
};