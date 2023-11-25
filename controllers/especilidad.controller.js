const Especialidad = require('../models').Especialidad;

exports.crearEspecialidad = (req, res) => {
    Especialidad.create(req.body)
        .then(especialidad => {
            res.status(200).json({datos: especialidad})
        })
        .catch(error => {
            res.status(500).json({error: 'Error al crear una especialidad'})
        })
}

exports.mostrarEspecialidad = (req, res) => {
    Especialidad.findAll({})
        .then(datos => {
            res.status(200).json({ datos: datos });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al mostrar las especialidades' });
        });
};

exports.editarEspecialidad = (req, res) => {
    Especialidad.update(req.body, {
        where: { id: req.params.id }
    })
        .then(especialidad => {
            res.status(200).json({ datos: especialidad });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al editar la especialidad' });
        });
};

exports.borrarEspecialidad = (req, res) => {
    Especialidad.destroy({
        where: { id: req.params.id }
    })
        .then(especialidad => {
            res.status(200).json({ datos: especialidad });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la especialidad' });
        });
};