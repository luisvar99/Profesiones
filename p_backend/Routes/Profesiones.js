const {Router} = require('express')
const {getProfesiones, getProfesionById, getTotalNumberoOfProfesiones, AddProfession,
    UpdateProfession, DeleteProfession
} = require('../Controllers/Profesiones')

const router = new Router();

router.post('/AddProfesion', AddProfession)
router.put('/UpdateProfession', UpdateProfession)

router.get('/getProfesiones', getProfesiones)
router.get('/getProfesionById/:id', getProfesionById)
router.get('/getTotalNumberoOfProfesiones', getTotalNumberoOfProfesiones)

router.delete('/deleteProfesion/:id', DeleteProfession)

module.exports = router;