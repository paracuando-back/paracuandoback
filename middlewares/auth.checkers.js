//? Previamente tiene que pasar por el middleware de autenticación
// const AuthService = require('../services/auth.service')

// const authService = new AuthService()

const adminRoleMiddleware = (req, res, next) => {
  // const id = req.user.id
  console.log(req.user, req.user.id)

  if(req.user.role === 1){
    next()
  } else {
    res.status(401).json({message: 'Permission Denied'})
  }
}
/*
  authService.findUserInfo(id)
    .then(data => {
      console.log(data[0].dataValues)
      if(data[0].dataValues.profile.dataValues.role_id === 1){
        next()
      } else {
        res.status(401).json({message: 'Permission Denied'})
      }
    })
    .catch(err => res.status(400).json({ message: err.message }))
*/
const isTheSameUserMiddleware = (req, res, next) => {

  console.log(req.user.id, req.param.id)

  if(req.user.id === req.param.id){
    next()
  } else {
    res.status(401).json({message: 'Permission Denied'})
  }
}

const adminOrSameMiddleware = (req, res, next) => {
  console.log('p', req.user.role, 'p', req.user.id, 'p', req.params.id, 'p', req.body.id)
  if(req.user.role === 1 || (req.user.id === req.params.id && !req.body.id) || (req.user.id === req.body.id && !req.params.id)){
    next()
  } else {
    res.status(401).json({message: 'Permission Denied'})
  }
}

module.exports = { 
  adminRoleMiddleware,
  isTheSameUserMiddleware,
  adminOrSameMiddleware
}
