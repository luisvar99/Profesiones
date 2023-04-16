const {Router} = require('express')
const {getWorkers, getTotalNumberoOfWorkers, getWorkerById, EditWorker, 
    DeleteWorker, getWorkerByInfo, getWorkersByProfession
} = require('../Controllers/Workers')

const router = new Router();

router.get('/getWorkers', getWorkers)
router.get('/getWorkerById/:id_usuario/:id_profesion', getWorkerById)
router.get('/getWorkersByProfession/:id', getWorkersByProfession)
router.get('/getWorkerByInfo/:cedula', getWorkerByInfo)
router.get('/getTotalNumberOfWorkers', getTotalNumberoOfWorkers)

router.put('/EditWorker', EditWorker)
router.delete('/DeleteWorker/:id_usuario/:id_profesion', DeleteWorker)

module.exports = router;