/** Dependencies */
// Redis Promises
const { getAsync, setAsync } = require('./redis-promises')
// Model
const {
  User,
} = require('../models')

/** Data SET Handler */
// Set all data upon login success (use in auth.js)
async function setDefaultAllData() {
  /** set user all redis */
  // get all user
  const usersDB = await User.find().select('-__v')
  // check if user all redis exist
  const usersRedisExist = await getAsync(`test_users`)
  if(!usersRedisExist) await setAsync(`test_users`, JSON.stringify(usersDB))
}

// Get all data
async function getDefaultAllData() {
  // get users
  const usersRedis = JSON.parse(await getAsync(`test_users`))

  return {
    usersRedis
  }
}

// Reset all data upon login success (use in dashboard.js)
async function resetDefaultAllData() {
  /** set user all redis */
  // get all user
  const usersDB = await User.find().select('-__v')
  await setAsync(`test_users`, JSON.stringify(usersDB))
}

/** Export */
module.exports = {
  getDefaultAllData, 
  setDefaultAllData,
  resetDefaultAllData
}