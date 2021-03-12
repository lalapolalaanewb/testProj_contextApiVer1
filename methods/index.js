/** Imports */
// Auth Methods
const { 
  userLogin, userLogout, 
  userRegister 
} = require('./auth')
// Dashboard Methods
const {
  getPrivateDashboard, updatePrivateDashboardRedisAllData
} = require('./dashboard')

/** Exports */
module.exports = {
  // Auth
  userLogin, userLogout, 
  userRegister,
  // Dashboard
  getPrivateDashboard, updatePrivateDashboardRedisAllData
}