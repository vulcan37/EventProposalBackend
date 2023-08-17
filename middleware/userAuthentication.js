const jwt = require('jsonwebtoken')


const userAuth = async (req, res, next) => {
  // check header authorization
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ msg: "Invalid Credentials,Please login" })
  }
  const token = authHeader.split(' ')[1] // splitting and  checking the token

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) 

    req.user = { userId: payload.userId, name: payload.name, accountType: payload.accountType }
    
    if (payload.accountType !== "User") {
      return res.status(401).json({ msg: "Invalid details" })
    }
    next()
  } catch (error) {
    res.status(401).json({ msg: "Invalid details" })
  }
}

module.exports = userAuth