const {Router} = require('express')
const {getUsers, AddUser
} = require('../Controllers/users')

const router = new Router();

router.post('/AddUser', AddUser)

router.get('/getUsers', getUsers)

module.exports = router;