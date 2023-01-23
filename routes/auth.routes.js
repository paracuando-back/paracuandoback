const express = require('express')
const router = express.Router()

const { postLogin } = require('../controllers/auth.controller')

router.post('/', postLogin)

module.exports = router
