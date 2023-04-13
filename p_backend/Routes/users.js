const {Router} = require('express')
const {getUsers, AddUser, getTotalNumberoOfUsers, getUserById, EditUser, 
    DeleteUser, getUserByInfo
} = require('../Controllers/users')

const router = new Router();

router.post('/AddUser', AddUser)

router.get('/getUsers', getUsers)
router.get('/getUserById/:id', getUserById)
router.get('/getUserByInfo/:cedula', getUserByInfo)
router.get('/getTotalNumberoOfUsers', getTotalNumberoOfUsers)

router.put('/EditUser', EditUser)
router.delete('/DeleteUser/:id', DeleteUser)

module.exports = router;