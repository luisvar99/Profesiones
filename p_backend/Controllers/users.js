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

const getUserById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = ($1)',
        [req.params.id]);
        console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const getUserByInfo = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE cedula = ($1)',
        [req.params.cedula]);
        console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const EditUser = async (req, res) => {
    try {
        const result = await db.query(`UPDATE users SET nombres=($1), apellidos=($2), cedula=($3), telefono=($4), 
        email=($5), rol=($6), "user"=($7), password=($8), direccion=($9) WHERE id = ($10)`,[
            req.body.nombres, req.body.apellidos, req.body.cedula, req.body.telefono, 
            req.body.email, req.body.rol, req.body.user, req.body.password, 
            req.body.direccion, req.body.id
        ]);
        //console.log("AddUser : " + JSON.stringify(result.rows));
        res.json({success: true});
    } catch (error) {
        res.json({success: false});
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

const DeleteUser = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM users WHERE id=($1)',[
            req.params.id
        ]);
        res.json({success:true});
    } catch (error) {
        res.json({success:false});
        console.log(error.message);
    }
} 

const getTotalNumberoOfUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT COUNT(*) FROM users');
        console.log("getTotalNumberoOfUsers : " + JSON.stringify(result.rows[0].count));
        res.json(result.rows[0].count);
    } catch (error) {
        res.json({success:false});
        console.log(error.message);
    }
} 

module.exports = {getUsers, AddUser, getTotalNumberoOfUsers, getUserById, 
    EditUser, DeleteUser, getUserByInfo}