require('dotenv').config()
const { comparePassword } = require('../utils/crypto')
const UsersService = require('./users.service')
// UsersService.updateUser
// UsersService.getUserByEmail

class AuthService {

  constructor() {

  }

  async checkUsersCredentials(email, password) {
    try {
      const user = await UsersService.getUserByEmail(email)
      const verifyPassword = comparePassword(password, user.password)
      if (verifyPassword) {
        return user
      }
      return null
    } catch (error) {
      return null
    }
  }

}

module.exports = AuthService