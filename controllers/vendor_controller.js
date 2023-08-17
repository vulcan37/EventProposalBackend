const Vendor = require('../models/vendor_model')

const signup = async (req, res, next) => {
  try {
    const vendor = await Vendor.create({ ...req.body })
    res.status(200).json({
      status: 'Success',
      user: vendor
    })
  } catch (error) {
    res.status(500).json({
      status: 'Failed',
      message: error.message
    })
  }
}

const signin = async (req, res) => {
  const { email, password } = req.body


  if (!email || !password) {
    return res.status(400).json({ msg: "incomplete details" })
  }
  const vendor = await Vendor.findOne({ email })
  if (!vendor) {
    return res.status(400).json({
      status: "Failed",
      message: "User Not Found"
    })
  }
  const isPasswordCorrect = await vendor.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(401).json({
      status: "Failed",
      message: "Wrong Password"
    })

  }
  // compare password
  const token = vendor.createJWT()
  res.status(400).json({
    status: "Success",
    token: token,
    user: vendor
  })
}

module.exports = {
  signup,
  signin,
}