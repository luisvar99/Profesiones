const {db} = require('../database');
const bcrypt = require('bcryptjs');

const Login = async (req, res) => {
    
    const potencialLogin = await db.query('SELECT * FROM users WHERE "user"=$1', 
    [req.body.username])
    
    if(potencialLogin.rowCount>0){
        const isSamePass = await bcrypt.compare(req.body.password, potencialLogin.rows[0].password)
        if(isSamePass){
            res.json({success: true, username: req.body.username, rol: potencialLogin.rows[0].rol})
            console.log(potencialLogin.rows[0].rol);
        }else{
            res.json({wrongPassword: true})
            console.log("Wrong password");
        }
    }else{ 
        console.log("Wrong Username");
        res.json({wrongUsername: true})
    }
}


module.exports = {
    Login
}