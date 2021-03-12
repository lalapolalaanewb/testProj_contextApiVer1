/** Dependencies */
// Express Router
const router = require("express").Router();
// Controllers
const {
  // Verification
  redirect2Login, redirect2Home
} = require('../controllers');
// Project Methods
const { userLogin, userLogout } = require('../methods')

/** Routes */
// @access    Order Sys V1 Editting Dashboard
// @purpose   User login interface
// @route     /api/v1/auth
router.route('/')
  .post(redirect2Home, userLogin)

// @access    Order Sys V1 Editting Dashboard
// @purpose   Log user out
// @route     /api/v1/auth/logout
router.route('/logout')
  .post(redirect2Login, userLogout)

// @access    Order Sys V1 Register
// @purpose   Register new user
// @route     /api/v1/auth/register
router.use('/register', require('./register'))

/** Export */
module.exports = router