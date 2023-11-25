const express = require('express')
const app = express()
const cors = require('cors');
const especialidadRoutes = require('./routes/especialidad.routes.js')
const especialistaRoutes = require('./routes/especialista.routes.js')
const pacienteRoutes = require('./routes/paciente.routes.js')
const examenRoutes = require("./routes/examen.routes.js")
const fotoRoutes = require("./routes/imagen.routes.js")

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/especialidad', especialidadRoutes)
app.use('/especialista', especialistaRoutes)
app.use('/paciente', pacienteRoutes)
app.use('/examen', examenRoutes)
app.use('/foto', fotoRoutes)

app.get('/', (req, res) => {
    res.send('Servidor en funcionamieto')
})

app.listen(3001, () => {
    console.log('Server UP running in http://localhost:3001')
})