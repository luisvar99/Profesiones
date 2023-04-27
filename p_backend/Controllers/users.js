const {db} = require('../database');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const getUserById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = ($1)',
        [req.params.id]);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
} 

const getUserByInfo = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE cedula = ($1)',
        [req.params.cedula]);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const EditUser = async (req, res) => {
    try {
        var password = "";
        if(req.body.newPassword==true){
            password = await bcrypt.hash(req.body.password, 10);
        }else{
            password = req.body.password;
        }
        const result = await db.query(`UPDATE users SET nombres=($1), apellidos=($2), cedula=($3), telefono=($4), 
        email=($5), rol=($6), "user"=($7), password=($8), direccion=($9), image=($10) WHERE id = ($11)`,[
            req.body.nombres, req.body.apellidos, req.body.cedula, req.body.telefono, 
            req.body.email, req.body.rol, req.body.user, password, 
            req.body.direccion, req.body.image, req.body.id
        ]);
        //console.log("AddUser : " + JSON.stringify(result.rows));
        res.json({success: true});
    } catch (error) {
        res.json({success: false, error: error.message});
        console.log(error.message);
    }
}

const AddUser = async (req, res) => {
    try {
        const ValidUserName = await db.query(`SELECT * FROM users WHERE "user"= ($1) `,[req.body.user])
        const ValidUserEmail = await db.query(`SELECT * FROM users WHERE email= ($1) `,[req.body.email])
        const ValidUserCedula = await db.query(`SELECT * FROM users WHERE cedula= ($1) `,[req.body.cedula])
        const ValidUserTelefono = await db.query(`SELECT * FROM users WHERE telefono= ($1) `,[req.body.telefono])
        if(ValidUserName.rowCount>0){
            res.json({ValidUserName: false});
        }
        else if(ValidUserEmail.rowCount>0){
            res.json({ValidUserEmail: false});
        }
        else if(ValidUserCedula.rowCount>0){
            res.json({ValidUserCedula: false});
        }
        else if(ValidUserTelefono.rowCount>0){
            res.json({ValidUserTelefono: false});
        }
        else{
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            const result = await db.query(`INSERT INTO users (nombres, apellidos, cedula, telefono, email, rol, "user", password, direccion, image) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,[
                req.body.nombres, req.body.apellidos, req.body.cedula, req.body.telefono, 
                req.body.email, req.body.rol, req.body.user, hashedPass, 
                req.body.direccion, req.body.image
            ]);
            if(req.body.rol===3){
                const resulttwo = await db.query(`SELECT id FROM users ORDER BY id desc limit 1`)
                console.log(resulttwo.rows[0]);
                const id_user = resulttwo.rows[0].id
                
                const resultthree = await db.query(`INSERT INTO trabajadores (id_user, id_profesion, descripcion, zonas) 
            VALUES ($1, $2, $3, $4)`,[
                id_user, req.body.id_profesion, req.body.descripcion, req.body.zonas
                ])
            }
            res.json({success: true, username: req.body.user});
        }
        //console.log("AddUser : " + JSON.stringify(result.rows));
    } catch (error) {
        res.json({success: false, error: error.message});
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
        res.json({success:false, error: error.message});
        console.log(error.message);
    }
} 

const getTotalNumberoOfUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT COUNT(*) FROM users');
        //console.log("getTotalNumberoOfUsers : " + JSON.stringify(result.rows[0].count));
        res.json(result.rows[0].count);
    } catch (error) {
        res.json({success:false, error: error.message});
        console.log(error.message);
    }
} 

const getStadistics = async (req, res) => {
    try {
        const result = await db.query(`SELECT COUNT(1) FILTER (WHERE rol = 2) AS usuarios, 
        COUNT(1) FILTER (WHERE rol = 3) AS workers
        FROM users`);
        //console.log("getTotalNumberoOfUsers : " + JSON.stringify(result.rows[0].count));
        res.json(result.rows[0]);
        console.log(result.rows[0]);
    } catch (error) {
        res.json({success:false, error: error.message});
        console.log(error.message);
    }
} 

module.exports = {getUsers, AddUser, getTotalNumberoOfUsers, getUserById, 
    EditUser, DeleteUser, getUserByInfo, getStadistics}