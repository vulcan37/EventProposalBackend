const User = require('../models/user_model')

const signup = async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body })
    res.status(200).json({
      status: 'Success',
      user: user
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
    return res.status(400).json({ msg: "Fill all the Fields" })
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({
      status: "Failed",
      message: "User Not Found"
    })
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    res.status(401).json({
      status: "Failed",
      message: "Wrong Password"
    })
  }
  // compare password
  const token = user.createJWT()
  res.status(400).json({
    status: "Success",
    token: token,
    user: user
  })

}

const addSelectedList = async (req, res) => {
  try {
    let id = await req.params.id;
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "User Not Found"
      })
    } else {
      if (user.selected_items.indexOf(req.body.id) === -1) {
        let updatedData = await User.findByIdAndUpdate({ _id: id }, { $push: { selected_items: req.body.id } }, { new: true })
        if (updatedData) {
          res.status(200).json({
            status: "Success",
            data: updatedData
          })
        } else {
          res.status(400).json({
            status: "Failed",
            message: "Already Added"
          })
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message
    })
  }
}

const delSelectedList = async (req, res) => {
  try {
    let id = req.params.id;
    let user = await User.findById(id);
    if (!user) {
      res.status(400).json({
        status: "Falied",
        message: "User Not Found"
      })
    } else {
      if (user.selected_items.indexOf(req.body.id) !== -1) {
        let user = await User.findByIdAndUpdate({ _id: id }, {
          $pull: { selected_items: req.body.id },
        }, { new: true });
        res.status(200).json({
          status: "Success",
          data: user
        })
      } else {
        res.status(400).send({
          status: "Failed",
          messgae: "Proposal not Found"
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message
    })
  }
}

module.exports = {
  signup,
  signin,
  addSelectedList,
  delSelectedList
}