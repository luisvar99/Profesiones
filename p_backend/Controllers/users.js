const {db} = require('../database');

const getUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const AddUser = async (req, res) => {
    try {
        const result = await db.query(`INSERT INTO users (nombres, apellidos, cedula, telefono, email, rol, "user", password, direccion) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,[
            req.body.nombres, req.body.apellidos, req.body.cedula, req.body.telefono, 
            req.body.email, req.body.rol, req.body.user, req.body.password, 
            req.body.direccion
        ]);
        //console.log("AddUser : " + JSON.stringify(result.rows));
        res.json({success: true});
    } catch (error) {
        res.json({success: false});
        console.log(error.message);
    }
} 

module.exports = {getUsers, AddUser}