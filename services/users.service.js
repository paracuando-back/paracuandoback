const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
const { hashPassword } = require('../utils/crypto')
require('dotenv').config()

class UsersService {

  constructor() {

  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.findAndCountAll(options)
    return users
  }

  async createUser({ first_name, last_name, email, username, password }) {
    const recordUser = {
      id: uuid4(), 
      first_name, 
      last_name, 
      email, 
      username, 
      password: hashPassword(password), 
      email_verified: new Date(),
      token: ''
    }
    const transaction = await models.sequelize.transaction()
    try {
      let newUser = await models.Users.create(recordUser, { transaction })
      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async createProfile({ user_id, image_url='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png', codephone=0, phone=0, country_id=0 }) {
    const recordProfile = {
      id: uuid4(), 
      user_id,
      role_id: 0,
      image_url,
      codephone,
      phone,
      country_id
    }
    const transaction = await models.sequelize.transaction()
    try {
      let newProfile = await models.Profiles.create(recordProfile, { transaction })
      await transaction.commit()
      return newProfile
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id)

    if (!user) throw new CustomError('Not found User', 404, 'Not Found')

    return user
  }

  async getUserByEmail(email) {
    let user = await models.Users.findOne({
      where: {
        email: email
      }
    })

    if (!user) throw new CustomError('Not found User', 404, 'Not Found')

    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    let user = await models.Users.findByPk(id, { raw: true })
    return user
  }

  async updateUser(id, { first_name, last_name, email, username, password, email_verified, token }) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let newUser = user.dataValues
      newUser.first_name = first_name 
      newUser.last_name = last_name 
      newUser.email = email 
      newUser.username = username 
      newUser.password = password 
      newUser.email_verified = email_verified 
      newUser.token = token
      let updatedUser = await models.Users.update(newUser, {
        where: {
          id: id
        }}, { transaction })
      await transaction.commit()
      return updatedUser[0]
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      await user.destroy({ transaction })

      await transaction.commit()

      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = UsersService