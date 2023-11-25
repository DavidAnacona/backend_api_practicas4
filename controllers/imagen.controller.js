const Foto = require('../models').Foto;
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: 'dffqyvvqb',
    api_key: '757337322883539',
    api_secret: '6qgpBHpzMKDIqFBqf9ThdsS1IZI'
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Solo se permiten archivos de imagen.'), false);
    }
    cb(null, true);
};
const cargarFoto = multer({ storage: storage, fileFilter: imageFilter }).single('imagen');

exports.subirFoto = (req, res) => { 
    cargarFoto(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Ocurre un error durante la carga del archivo
            return res.status(500).send(err.message);
        } else if (err) {
            // Ocurre un error no relacionado con multer
            return res.status(500).send(err.message);
        }

        // No hubo errores; proceder con la subida de la imagen a Cloudinary
        // Verifica si `req.file` existe ya que `cargarFoto` es asincrónico y podría no haber archivo si hubo un error
        if (!req.file) {
            return res.status(400).send('No se ha subido ninguna imagen.');
        }

        const path = req.file.path;
        cloudinary.uploader.upload(path, function(error, result) {
            // Eliminar el archivo local después de subirlo o si hay un error
            fs.unlink(path, (err) => {
                if (err) console.error('Error al eliminar el archivo local:', err);
            });

            if (error) {
                return res.status(500).send("Error al subir la imagen a Cloudinary: " + error.message);
            }
            
            // Crea un registro en la base de datos con los detalles de la imagen
            Foto.create({
                nombreImagen: result.original_filename, // Asegúrate de que 'original_filename' es proporcionado por Cloudinary
                urlImagen: result.url,
                idPaciente: req.params.idPaciente // El ID del paciente debería ser parte de la ruta o del cuerpo de la petición
            }).then(foto => {
                res.status(200).json(foto);
            }).catch(err => {
                console.error('Error al guardar en la base de datos:', err);
                res.status(500).send("Error al guardar los detalles de la imagen.");
            });
        });
    });
};

exports.mostrarFotos = (req, res) => {
    Foto.findAll({})
        .then(datos => {
            res.status(200).json({ datos: datos });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al mostrar las especialidades' });
        });
};

exports.borrarFoto = (req, res) => {
    Foto.destroy({
        where: { id: req.params.id }
    })
        .then(dato => {
            res.status(200).json({ datos: dato });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar la especialidad' });
        });
};

