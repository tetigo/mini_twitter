const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next)=>{
  try {
    const token = req.header('auth_token')
    console.log('tigoliro1---->',token)
    if(!token) return res.status(400).send({error: 'Access denied'})
    const verified = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    return next()
  } catch (error) {
    res.status(400).send({error: 'Invalid token'})
    return next(error)
  }
}

module.exports = validateToken