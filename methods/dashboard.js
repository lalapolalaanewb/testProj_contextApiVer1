/** Dependencies */
// Model - User
const {
  User
} = require('../models')
// Controllers
const {
  // Redis Promises
  getDefaultAllData, resetDefaultAllData
} = require('../controllers')

/** Methods */
// @desc    Portfolio V4 Dashboard (Get All Counts)
// @route   POST /api/v1/dashboard
// @access  Private (Require sessionId & uid)
exports.getPrivateDashboard = async(req, res, next) => {
  try {
    const redisAllData = await getDefaultAllData()
    const users = redisAllData.usersRedis
    console.log(users); console.log(req.session.userId)
    let user = users.find(user => user._id === req.session.userId)
    console.log(user)
    // - throw an error if user not found
    if(!user) return res.status(400).json({
      success: false,
      error: `Failed to get active user data from User Collection`,
      data: {}
    })
    
    return res.status(200).json({
      success: true,
      count: 1,
      data: {
        id: user._id,
        email: user.credentials.emails.main,
        name: user.name.firstName + user.name.lastName
      }
    })
  } catch(err) { console.log(err)
    return res.status(500).json({
      success: false,
      error: `Failed to get data from Database`,
      data: err
    })
  }
}

// @desc    Portfolio V4 Dashboard (Reset All Redis Data)
// @route   POST /api/v1/dashboard/resetredis
// @access  Private (Require sessionId & uid)
exports.updatePrivateDashboardRedisAllData = async(req, res, next) => {
  try {
    const redisAllData = await getDefaultAllData()

    // reset all available data to redis
    await resetDefaultAllData()

    // get ACTIVE user
    const users = redisAllData.usersRedis
    console.log(users); console.log(req.session.userId)
    let user = users.find(user => user._id === req.session.userId)
    console.log(user)
    // - throw an error if user not found
    if(!user) return res.status(400).json({
      success: false,
      error: `Failed to get active user data from User Collection`,
      data: {}
    })
    
    return res.status(200).json({
      success: true,
      count: 1,
      data: {
        id: user._id,
        email: user.credentials.emails.main,
        name: user.name.firstName + user.name.lastName
      }
    })
  } catch(err) { 
    return res.status(500).json({
      success: false,
      error: `Failed to reset redis data. Please try again later.`,
      data: err
    })
  }
}