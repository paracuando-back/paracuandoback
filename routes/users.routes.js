const express = require('express')
const router = express.Router()

const {
  getUsers,
  getUser,
  updateUser,
  removeUser } = require('../controllers/users.controller')
const {
  adminRoleMiddleware,
  isTheSameUserMiddleware,
  adminOrSameMiddleware
} = require('../middlewares/auth.checkers')

router.get('/', /* isAnyRoleByList(['admin']), */getUsers)
router.get('/:id', adminOrSameMiddleware, getUser)
router.put('/:id', isTheSameUserMiddleware, updateUser)
router.delete('/:id', adminRoleMiddleware, removeUser)

module.exports = router