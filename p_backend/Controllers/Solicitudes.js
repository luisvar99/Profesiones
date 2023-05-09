const {db} = require('../database');
const bcrypt = require('bcrypt');

const getSolicitudes = async (req, res) => {
    try {
        const result = await db.query(`SELECT s.id AS id_solicitud, u.id AS id_user, s.status,
        CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, u.cedula, p.nombre, s.fecha, s.hora,
        s.fecha_ejecucion
        from solicitudes s
        INNER JOIN profesiones p ON p.id = s.id_profesion
        INNER JOIN users u ON u.id = s.id_user
        ORDER BY id_solicitud DESC
        LIMIT 10`);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log("error getSolicitudes: " + error.message);
    }
} 

const getUserSolicitudes = async (req, res) => {
    try {
        const result = await db.query(`SELECT s.id AS id_solicitud, u.id AS id_user, s.status,
        CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, p.nombre AS categoria, s.fecha, s.hora,
        s.fecha_ejecucion
        from solicitudes s
        INNER JOIN profesiones p ON p.id = s.id_profesion
        INNER JOIN users u ON u.id = s.id_trabajador
        WHERE s.id_user = ($1)
        ORDER BY id_solicitud DESC`,[req.params.id]);

        res.json(result.rows);
    } catch (error) {
        console.log("error getUserSolicitudes: " + error.message);
    }
} 

const getSolicitudById = async (req, res) => {
    try {
        const result = await db.query(`SELECT s.id AS id_solicitud, u.id AS id_user, s.status,
        CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, u.cedula, p.nombre, s.fecha, s.hora
        from solicitudes s
        INNER JOIN profesiones p ON p.id = s.id_profesion
        INNER JOIN users u ON u.id = s.id_user OR u.id = s.id_trabajador 
        WHERE s.id = ($1)`,
        [req.params.id]);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log("error getSolicitudById: " + error.message);
    }
} 

const getSolicitudByInfo = async (req, res) => {
    try {
        const result = await db.query(`SELECT s.id AS id_solicitud, u.id AS id_user, s.status,
        CONCAT(u.nombres, ' ', u.apellidos) AS nombre_completo, u.cedula, p.nombre, s.fecha, s.hora,
        s.fecha_ejecucion, u.cedula
        from solicitudes s
        INNER JOIN profesiones p ON p.id = s.id_profesion
        INNER JOIN users u ON u.id = s.id_user OR u.id = s.id_trabajador 
        WHERE u.cedula = ($1)
        ORDER BY id_solicitud`,
        [req.params.cedula]);
        //console.log("getProfesiones : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log("error getSolicitudByInfo" + error.message);
    }
} 

const EditSolicitud = async (req, res) => {
    try {
        const result = await db.query(`UPDATE Solicitudes SET fecha=($1), hora=($2), status=($3) WHERE id = ($4)`,[
            req.body.fecha, req.body.hora, req.body.status, req.body.id
        ]);
        //console.log("AddSolicitud : " + JSON.stringify(result.rows));
        res.json({success: true});
    } catch (error) {
        res.json({success: false, error: error.message});
        console.log(error.message);
    }
}

const CreateSolicitud = async (req, res) => {
    console.log(req.body);
    try {
        const result = await db.query(`INSERT INTO solicitudes (id_user, id_trabajador, id_profesion, fecha, hora, status, fecha_ejecucion) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,[
            req.body.id_user, req.body.id_trabajador, req.body.id_profesion, req.body.fecha, req.body.hora,
            req.body.status, req.body.fecha_ejecucion
        ])
    
        res.json({success: true});
    } catch (error) {
        res.json({success: false, error: error.message});
        console.log(error.message);
    }
}

const DeleteSolicitud = async (req, res) => {
    try {
        const result = await db.query('DELETE FROM Solicitudes WHERE id=($1)',[
            req.params.id
        ]);
        res.json({success:true});
    } catch (error) {
        res.json({success:false, error: error.message});
        console.log(error.message);
    }
} 

const getTotalNumberoOfSolicitudes = async (req, res) => {
    try {
        const result = await db.query('SELECT COUNT(*) FROM Solicitudes');
        //console.log("getTotalNumberoOfSolicitudes : " + JSON.stringify(result.rows[0].count));
        res.json(result.rows[0].count);
    } catch (error) {
        res.json({success:false, error: error.message});
        console.log("getTotalNumberoOfSolicitudes: " + error.message);
    }
} 

module.exports = {getSolicitudes, CreateSolicitud, getTotalNumberoOfSolicitudes, getSolicitudById, 
    EditSolicitud, DeleteSolicitud, getSolicitudByInfo, getUserSolicitudes}