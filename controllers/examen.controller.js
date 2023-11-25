const Examen = require('../models').Examen;
const { Dropbox } = require('dropbox');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const fetch = require('isomorphic-fetch');

const dropbox = new Dropbox({ accessToken: 'sl.BqgfFqXO4CGvcrT6ACD1z35rnW63mYHRu71j_qbAQ5ER-DLGP2qMgoNmxAiQOupjl9znn19jH9oq3oH6uwllct-yI51tzGCEXy-LX6D1JnGhdzPVY_qLnoAtqcxG4cVURy1RjFTfVkYfdTUAZbClpZU', fetch });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const pdfUpload = upload.single('pdf');

exports.crearExamen = (req, res) => {
    // Aquí usamos el middleware de multer para manejar la subida de archivos.
    pdfUpload(req, res, function (err) {
        const {id, nombre} = req.params

        if (err) {
            // manejar errores de multer aquí
            console.error('Error de Multer:', err);
            return res.status(500).send('Error al procesar el archivo PDF.');
        }

        // Ahora el archivo ha sido procesado por multer y está disponible como `req.file`
        const file = req.file;

        // Verifica si el archivo es un PDF
        if (file.mimetype !== 'application/pdf') {
            fs.unlinkSync(file.path); // eliminar el archivo subido si no es un PDF
            return res.status(400).send('Por favor, sube solo archivos PDF.');
        }

        // Lee el contenido del archivo PDF
        fs.readFile(file.path, (err, contents) => {
            if (err) {
                console.error('Error al leer el archivo:', err);
                return res.status(500).send('Error al leer el archivo.');
            }

            // Carga el archivo a Dropbox
            dropbox.filesUpload({ path: '/' + file.filename, contents })
                .then(uploadResponse => {
                    // Crea un enlace compartido de Dropbox
                    return dropbox.sharingCreateSharedLinkWithSettings({ path: uploadResponse.result.path_lower, settings: { requested_visibility: 'public' } });
                })
                .then(shareResponse => {
                    // Convertir enlace compartido a enlace de descarga directa
                    const sharedLink = shareResponse.result.url;
                    const directLink = sharedLink.replace('dl=0', 'raw=1');

                    Examen.create({
                        nombre: nombre, // o file.filename si quieres guardar el nombre del archivo
                        urlPdf: directLink,
                        documentoPaciente: id // Asegúrate de que esto se envía en la solicitud
                    });

                    // Eliminar el archivo local una vez subido a Dropbox
                    fs.unlinkSync(file.path);

                    // Envía el enlace de descarga directa como respuesta
                    res.status(200).json({ link: directLink });
                })
                .catch(error => {
                    // Eliminar el archivo local si hay un error con Dropbox
                    fs.unlinkSync(file.path);
                    console.error('Error al subir el archivo a Dropbox:', error);
                    res.status(500).send('Error al subir el archivo a Dropbox.');
                });
        });
    });
};

exports.mostrarExamen = (req, res) => {
    Examen.findAll({})
        .then(datos => {
            res.status(200).json({ datos: datos });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error al mostrar las paciente' });
        });
};