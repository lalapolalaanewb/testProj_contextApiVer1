/** Dependencies */
// Bcrypt
const bcrypt = require('bcryptjs')
// Model - Project
const {
  User
} = require('../models')
// Controllers
const {
  // Redis Data
  setDefaultAllData,
  // Session
  SESS_ABSOULTE_TIMEOUT,
  // Verification
  logIn, logOut,
} = require('../controllers')

/** Page Specific Functions */
// handle email 'regex'
const handleEmailRegex = email => {
  const emailRegex = /^.+@[^\.].*\.[a-z]{2,}$/

  return emailRegex.test(email.trim())
}
// handle 'none' input
const handleNoneInput = input => {
  if(input === 'none') return ''
  else return input
}

/** Methods */

// @desc    Allow user login
// @route   POST /api/v1/auth
// @access  Private
exports.userLogin = async(req, res, next) => {
  const { email } = req.body
  console.log('server: '); console.log(req.body); console.log(typeof email)
  // check user exist
  const userExist = await User.findOne({ 'credentials.emails.main': email.email })
  if(!userExist) return res.status(401).json({
    success: false,
    error: `Incorrect username or password.`,
    data: {}
  })
  
  // check if password matched
  const valiPassword = await bcrypt.compare(email.password, userExist.credentials.password)
  if(!valiPassword) return res.status(401).json({
    success: false,
    error: `Incorrect password or username.`,
    data: {}
  })
  
  // assign new session data for user
  await logIn(req, userExist._id)

  // set all available data to redis
  await setDefaultAllData()

  // return with success message
  return res.status(200).json({
    success: true,
    count: userExist.length,
    data: {
      uid: userExist._id,
      sato: req.session.createdAt + SESS_ABSOULTE_TIMEOUT
    }
  })
}

// @desc    Log user out
// @route   POST /api/v1/auth/logout
// @access  Private
exports.userLogout = async(req, res, next) => {
  await logOut(req, res)
}

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Private
exports.userRegister = async(req, res, next) => {
  let {
    emailMain, emailBackup, password,
    firstName, lastName, nickName
  } = req.body
  // return console.log(req.body)
  // do server validation
  // check emailMain regex
  if(!handleEmailRegex(emailMain)) return res.status(400).json({
    success: false,
    error: `Invalid main email! Please provide correct email address.`,
    data: {}
  })
  if(emailBackup !== 'none') {
    if(!handleEmailRegex(emailBackup)) return res.status(400).json({
      success: false,
      error: `Invalid backup email! Please provide correct email address.`,
      data: {}
    })
  }

  // check if user already exist
  const userExist = await User.findOne({ 'credentials.emails.main': emailMain })
  if(userExist) return res.status(400).json({
    success: false,
    error: `User already exists.`,
    data: {}
  })

  // hashed password
  const passwordHashed = await bcrypt.hash(password, await bcrypt.genSalt(12))

  // create new user object
  const user = new User({
    // name
    name: {
      // firstName
      firstName: handleNoneInput(firstName),
      // lastName
      lastName: handleNoneInput(lastName),
      // nickName
      nickName: handleNoneInput(nickName)
    },
    // credentials
    credentials: {
      emails: {
        // main
        main: emailMain,
        // backup
        backup: handleNoneInput(emailBackup)
      },
      // password
      password: passwordHashed
    }
  })

  // save new user
  user.save()
  .then(user => {
    return res.status(202).json({
      success: true,
      count: 1,
      data: user
    })
  })
  .catch(err => {
    res.status(500).json({
      success: false,
      error: `Having trouble saving new user info in db. Please try again later.`,
      data: err
    })
  })
}