const express = require('express');
const cors = require('cors');
const usersRoute = require('./Routes/users')
const AuthRoute = require('./Routes/Auth')

require('dotenv').config();

const app = express();
const corsOptions ={
    origin: true,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(usersRoute)
app.use(AuthRoute)

const PORT = process.env.PORT || 4000
app.listen(PORT, (req, res) => {
    console.log(`Listening on port number: ${PORT}`);
})