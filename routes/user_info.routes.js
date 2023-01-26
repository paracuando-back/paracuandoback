const express = require('express')
const router = express.Router()

const { getUserInfo } = require('../controllers/auth.controller')
const {
  adminOrSameMiddleware
} = require('../middlewares/auth.checkers')

router.get('/',adminOrSameMiddleware, getUserInfo)

module.exports = router