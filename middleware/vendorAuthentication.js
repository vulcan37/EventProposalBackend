const jwt = require('jsonwebtoken')
const vendorAuth = async (req, res, next) => {
  

  const authHeader = req.headers.authorization
  console.log(req.body)
  if (!authHeader) {
    return res.status(401).json({ msg: "invalid Credentials,please login" })
  }
  const token = authHeader

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.vendor = { vendorId: payload.vendorId, name: payload.name, accountType: payload.accountType }
    if (payload.accountType !== "Vendor") {
      return res.status(401).json({ msg: "login with rendor account" })
    }
    next()
  } catch (error) {
    res.status(401).json({ msg: "wrong details" })
  }

  
}

module.exports = vendorAuth