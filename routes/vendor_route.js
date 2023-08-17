const express = require("express")
const vendorRouter = express.Router();
const { signup, signin } = require("../controllers/vendor_controller");



vendorRouter.post("/register", signup)

vendorRouter.post("/login", signin)




module.exports = vendorRouter;  