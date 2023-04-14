const {Router} = require('express')
const {getWorkers, getTotalNumberoOfWorkers, getUserById, EditUser, 
    DeleteWorker, getUserByInfo
} = require('../Controllers/Workers')

const router = new Router();

router.get('/getWorkers', getWorkers)
router.get('/getUserById/:id', getUserById)
router.get('/getUserByInfo/:cedula', getUserByInfo)
router.get('/getTotalNumberOfWorkers', getTotalNumberoOfWorkers)

router.put('/EditUser', EditUser)
router.delete('/DeleteUser/:id', DeleteWorker)

module.exports = router;