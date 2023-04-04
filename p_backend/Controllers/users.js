const {db} = require('../database');

const getUsers = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM users');
        console.log("getUsers : " + JSON.stringify(result.rows));
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
} 

module.exports = {getUsers}