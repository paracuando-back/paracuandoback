const UsersService = require('../services/users.service')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')
const mailer = require('../utils/mailer')
require('dotenv').config()


const usersService = new UsersService()

const getUsers = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {
  try {
    let { body } = request
    let user = await usersService.createUser(body)
    await mailer.sendMail({
      from: `<${process.env.MAIL_USER}>`,
      to: user.email,
      subject: `Hola ${body.first_name}, has ingresado a ¿ParaCuándo?`,
      html: `<h1>Te damos la bienvenida ${user.first_name}</h1> 
      <h2">Pronto tendrás instrucciones para apoyar eventos, marcas y espectáculos en tu comunidad.</h2> `,
      text: 'Que gusto verte por aqui!',
    })

    return response.status(201).json({ results: user })
  } catch (error) {
    next(error)
  }
}

const getUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let users = await usersService.getUserOr404(id)
    return response.json({ results: users })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let { body } = request
    let user = await usersService.updateUser(id, body)
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await usersService.removeUser(id)
    return response.json({ results: user, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser
}