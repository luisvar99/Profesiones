const {db} = require('../database');

const getProfesiones = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM profesiones');
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const getTotalNumberoOfProfesiones = async (req, res) => {
    try {
        const result = await db.query('SELECT COUNT(*) FROM profesiones');
        console.log("getTotalNumberoOfProfesiones : " + JSON.stringify(result.rows[0].count));
        res.json(result.rows[0].count);
    } catch (error) {
        console.log(error.message);
    }
} 

const AddProfession = async (req, res) => {
    try {
        const result = await db.query('INSERT INTO profesiones (nombre) VALUES($1)',[
            req.body.nombre
        ]);
        res.json({success: true});
    } catch (error) {
        res.json({success: false});
        console.log(error.message);
    }
} 

module.exports = {getProfesiones, getTotalNumberoOfProfesiones, AddProfession}