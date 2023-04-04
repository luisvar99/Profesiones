const {Router} = require('express')
const {getUsers
} = require('../Controllers/users')

const router = new Router();

router.get('/getUsers', getUsers)

module.exports = router;