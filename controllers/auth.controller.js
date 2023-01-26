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
      .then(({user_data, profile_data}) => {
        if (user_data) {
          const token = jwt.sign({
            id: user_data.id,
            email: user_data.email,
            role: profile_data.role_id
          }, jwtSecret)
          user_data.token = token
          usersService.updateUser(user_data.id, user_data)
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

const getUserInfo = async (request, response, next) => {
  try {
    let { id } = request.body
    let user = await authService.findUserInfo(id)
    return response.json(user)
    // return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postLogin,
  getUserInfo
}
