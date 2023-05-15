const express = require('express')
const router = express.Router()
const { register,  login } = require('../Controllers/userController')

const {protect} = require('../middleware/authMiddleware')


router.post('/register', register)
router.post('/login', login)
// router.get('/me', protect,  userdata)

module.exports = router