const {Router} = require('express')
const {getProfesiones, getTotalNumberoOfProfesiones, AddProfession
} = require('../Controllers/Profesiones')

const router = new Router();

router.post('/AddProfesion', AddProfession)

router.get('/getProfesiones', getProfesiones)
router.get('/getTotalNumberoOfProfesiones', getTotalNumberoOfProfesiones)

module.exports = router;