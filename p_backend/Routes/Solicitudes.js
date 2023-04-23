const {Router} = require('express')
const {getSolicitudes, CreateSolicitud, getTotalNumberoOfSolicitudes, getSolicitudById, EditSolicitud, 
    DeleteSolicitud, getSolicitudByInfo, getUserSolicitudes
} = require('../Controllers/Solicitudes')

const router = new Router();

router.post('/CreateSolicitud', CreateSolicitud)

router.get('/getSolicitudes', getSolicitudes)
router.get('/GetSolicitudByID/:id', getSolicitudById)
router.get('/getUserSolicitudes/:id', getUserSolicitudes)
router.get('/getSolicitudByInfo/:cedula', getSolicitudByInfo)
router.get('/getTotalNumberoOfSolicitudes', getTotalNumberoOfSolicitudes)

router.put('/EditSolicitud', EditSolicitud)
router.delete('/DeleteSolicitud/:id', DeleteSolicitud)

module.exports = router;