const AuthService = require('../services/auth.service')
const UsersService = require('../services/users.service')

const authService = new AuthService()
const usersService = new UsersService()

const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET

const postLogin = async (req, res) => {
  const { email, password } = req.body
  if (email && password) {
    authService.checkUsersCredentials(email, password)
      .then((data) => {
        if (data) {
          const token = jwt.sign({
            id: data.id,
            email: data.email
          }, jwtSecret)
          data.token = token
          usersService.updateUser(data.id, data)
          res.status(200).json({
            message: 'Correct Credentials.  Here is your JWT token:',
            token
          })
        } else {
          res.status(401).json({ message: 'Invalid Credentials' })
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message })
      })
  } else {
    res.status(400).json({
      message: 'Missing Data', fields: {
        email: 'example@example.com',
        password: 'string'
      }
    })
  }
}

module.exports = {
  postLogin
}
