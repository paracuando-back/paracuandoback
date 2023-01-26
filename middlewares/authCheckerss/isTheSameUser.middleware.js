//? Previamente tiene que pasar por el middleware de autenticación

const isTheSameUserMiddleware = (req, res, next) => {

  console.log(req.user.id, req.param.id)

  if(req.user.id === req.param.id){
    next()
  } else {
    res.status(401).json({message: 'Permission Denied'})
  }
}

module.exports = isTheSameUserMiddleware
