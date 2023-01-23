const express = require('express')
const router = express.Router()

const {
  addUser,
} = require('../controllers/users.controller')

/* Ejemplos
const {
  isAdminRole,
  isTheSameUser,
  isAdminOrSameUser,
  isAnyRoleByList
} = require('../middlewares/auth.checkers') // requerimos la función
*/

/* 
 Ideen una manera que sea modular, limpia y escalable.
 Si hacen muchas funciones como isAdminOrSameUser para cada situación,
 mientras se pueda leer claramente y escalar, está bien.
*/
//Solo cuiden la escalabilidad, esta son unas ideas

router.post('/', addUser)

module.exports = router