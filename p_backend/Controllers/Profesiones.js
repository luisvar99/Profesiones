const {db} = require('../database');

const getProfesiones = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM profesiones');
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json({rows: result.rows, success:true});
    } catch (error) {
        console.log(error.message);
    }
} 

const getProfesionById = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM profesiones WHERE id = ($1)',[
            req.params.id
        ]);
        //console.log("getProfesionById : " + JSON.stringify(result.rows[0].nombre));
        res.json(result.rows[0].nombre);
    } catch (error) {
        console.log(error.message);
    }
} 

const getTotalNumberoOfProfesiones = async (req, res) => {
    try {
        const result = await db.query('SELECT COUNT(*) FROM profesiones');
        //console.log("getTotalNumberoOfProfesiones : " + JSON.stringify(result.rows[0].count));
        res.json(result.rows[0].count);
    } catch (error) {
        res.json({success:false, error: error.message});
        console.log("error getTotalNumberoOfProfesiones: " + error.message);
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

const UpdateProfession = async (req, res) => {
    try {
        const result = await db.query('UPDATE profesiones SET nombre = ($1) WHERE id = ($2)',[
            req.body.nombre, req.body.id
        ]);
        res.json({success: true});
    } catch (error) {
        res.json({success: false});
        console.log(error.message);
    }
} 

const DeleteProfession = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM profesiones WHERE id = ($1)',[
            req.params.id
        ]);
        res.json({success: true});
    } catch (error) {
        res.json({success: false});
        console.log(error.message);
    }
} 

module.exports = {getProfesiones, getTotalNumberoOfProfesiones, 
    AddProfession, getProfesionById, UpdateProfession, DeleteProfession
}