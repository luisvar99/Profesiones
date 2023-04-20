const {db} = require('../database');

const getWorkers = async (req, res) => {
    try {
        const result = await db.query(`select CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, 
        u.cedula, u.telefono, p.nombre as profesion, t.zonas, t.descripcion, t.id_user, t.id_profesion,
        u.image
        from trabajadores t
        INNER JOIN users u ON u.id = t.id_user
        INNER JOIN profesiones p ON p.id = t.id_profesion`);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 
const getWorkersByProfession = async (req, res) => {
    try {
        const result = await db.query(`select CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, 
        u.cedula, u.telefono, p.nombre as profesion, t.zonas, t.descripcion, t.id_user, t.id_profesion,
        u.image
        from trabajadores t
        INNER JOIN users u ON u.id = t.id_user
        INNER JOIN profesiones p ON p.id = t.id_profesion
        WHERE id_profesion=($1)`,[req.params.id]);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const getWorkerById = async (req, res) => {
    try {
        const result = await db.query(`select CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, 
        u.cedula, u.telefono, p.nombre as profesion, t.zonas, t.descripcion, t.id_profesion, 
        t.id_user AS id_trabajador, u.image
        from trabajadores t
        INNER JOIN users u ON u.id = t.id_user
        INNER JOIN profesiones p ON p.id = t.id_profesion
        WHERE t.id_user = ($1) AND t.id_profesion = ($2)`,
        [req.params.id_usuario, req.params.id_profesion]);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const getWorkerByInfo = async (req, res) => {
    try {
        const result = await db.query(`select CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, 
        u.cedula, u.telefono, p.nombre as profesion, t.zonas, t.descripcion, t.id_profesion
        from trabajadores t
        INNER JOIN users u ON u.id = t.id_user
        INNER JOIN profesiones p ON p.id = t.id_profesion
        WHERE u.cedula = ($1)`,[req.params.cedula]);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

const EditWorker = async (req, res) => {
    try {
        const result = await db.query(`UPDATE trabajadores SET descripcion=($1), zonas=($2), id_profesion = ($3)
        WHERE id_user = ($4) AND id_profesion = ($5)`,[
            req.body.descripcion, req.body.zonas, req.body.id_profesion ,req.body.id_usuario, req.body.last_id_profesion
        ]);
        //console.log("AddUser : " + JSON.stringify(result.rows));
        res.json({success: true});
    } catch (error) {
        res.json({success: false});
        console.log(error.message);
    }
}


const DeleteWorker = async (req, res) => {
    console.log("Delete Worker: " + JSON.stringify(req.params));
    try {
        const result = await db.query('DELETE FROM trabajadores WHERE id_user=($1) AND id_profesion=($2)',[
            req.params.id_usuario, req.params.id_profesion
        ]);
        const resultTwo = await db.query('DELETE FROM users WHERE id=($1)',[
            req.params.id_usuario
        ]);
        res.json({success:true});
    } catch (error) {
        res.json({success:false});
        console.log(error.message);
    }
} 

const getTotalNumberoOfWorkers = async (req, res) => {
    try {
        const result = await db.query('SELECT COUNT(*) FROM users WHERE rol=3');
        //console.log("getTotalNumberoOfWorkers : " + JSON.stringify(result.rows[0].count));
        res.json(result.rows[0].count);
    } catch (error) {
        res.json({success:false});
        console.log(error.message);
    }
} 

module.exports = {getWorkers, getTotalNumberoOfWorkers, getWorkerById, 
    EditWorker, DeleteWorker, getWorkerByInfo, getWorkersByProfession}