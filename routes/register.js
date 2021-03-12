/** Dependencies */
// Express Router
const router = require("express").Router();
// Controller
const {
  // Verification
  adminAccessPublic
} = require('../controllers')
// Project Methods
const { userRegister } = require('../methods')

/** Access (For Admin uses only) */
const adminAccess = (req, res, next) => {
  if(req.params.key !== process.env.ADMIN_ACCESS) { 
    // if(process.env.NODE_ENV === 'production') return res.redirect('/projects')

    return res.status(401).json({
      sucess: false,
      error: `You are not authorized to access the data!`,
      data: []
    })
  }

  // continue
  next()
}

// @access    Portfolio V4 Register
// @purpose   Register new user
// @route     /api/v1/auth/register/admin
router.route('/admin/:key')
  .post(adminAccess, userRegister)

/** Export */
module.exports = router