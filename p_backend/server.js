const express = require('express');
const cors = require('cors');
const UsersRoute = require('./Routes/users')
const AuthRoute = require('./Routes/Auth')
const ProfesionesRoute = require('./Routes/Profesiones')
const WorkersRoute = require('./Routes/Workers')
const SolicitudesRoute = require('./Routes/Solicitudes')

require('dotenv').config();

const app = express();
const corsOptions ={
    origin: true,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb'}));

app.use(UsersRoute)
app.use(AuthRoute)
app.use(ProfesionesRoute)
app.use(WorkersRoute)
app.use(SolicitudesRoute)

const PORT = process.env.PORT || 4000
app.listen(PORT, (req, res) => {
    console.log(`Listening on port number: ${PORT}`);
})