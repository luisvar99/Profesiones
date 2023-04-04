const {db} = require('../database');
const bcrypt = require('bcryptjs');

const Login = async (req, res) => {
    console.log(req.body);
    
    const potencialLogin = await db.query('SELECT * FROM users WHERE "user"=$1', 
    [req.body.username])
    
    if(potencialLogin.rowCount>0){
        const isSamePass = await bcrypt.compare(req.body.password, potencialLogin.rows[0].password)
        if(isSamePass){
            res.json({success: true, username: req.body.username, user: potencialLogin.rows})
        }else{
            res.json({wrongPassword: true})
            console.log("Wrong password");
        }
    }else{ 
        console.log("Wrong Username");
        res.json({wrongUsername: true})
    }
}

const SignUp = async (req, res) => {
    
    const existingUser = await db.query('SELECT username from users where LOWER(username) = $1',
    [req.body.username])
    if (existingUser.rowCount==0){
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const newUserQuery = await db.query("INSERT INTO users (username, passhash, mombres, apellidos, cedula, accion, fecha_nacimiento, correo_electronico, sexo, role) VALUES($1,$2) RETURNING id, username",
        [req.body.username, hashedPass]);
        
        console.log(newUserQuery.rows[0]);
        req.session.user = {
            username: req.body.username,
            id: newUserQuery.rows[0].id
        }
        console.log(newUserQuery.rows[0]);
        res.json({loggedIn:true, username: req.body.username, id:newUserQuery.rows[0].id})

    }else{
        res.json({loggedIn: false, status: "Username taken"});
    }
    
}


module.exports = {
    SignUp,
    Login
}