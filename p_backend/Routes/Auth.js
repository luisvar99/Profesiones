const {Router} = require('express')
const {Login
} = require('../Controllers/Auth')

const router = new Router();

router.post('/login', Login)

module.exports = router;