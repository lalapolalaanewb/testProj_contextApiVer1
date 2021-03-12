/** Verification Functions Handler */
// Verify not loggeed-in user
exports.redirect2Login = async(req, res, next) => { // console.log(req.session)
  if(!req.session.userId) {
    console.log('no session created in server')
    return res.status(401).json({
      success: false,
      error: `You are not logged-in. Please login to access the data.`,
      data: {}
    })
  }

  // check if Authorization header send
  const authHeader = await req.get('Authorization')
  console.log(authHeader)
  if(!authHeader) {
    console.log('no header Auth sent from browser')
    return res.status(401).json({
      success: false,
      error: `You are not logged-in. Please login to access the data.`,
      data: {}
    })
  }

  // check if uid exist
  const uid = authHeader.split(' ')[1] // Eg- Authorization: Bearer ejyjdgjhdgfd
  if(!uid || uid === '') {
    console.log('no token uid sent from browser')
    return res.status(401).json({
      success: false,
      error: `You are not logged-in. Please login to access the data.`,
      data: {}
    })
  }

  // continue
  if(req.session.userId === uid) return next()
  else {
    return res.status(401).json({
      success: false,
      error: `You are not logged-in. Please login to access the data.`,
      data: {}
    })
  } 
}

// Verify logged-in user
exports.redirect2Home = async(req, res, next) => {
  if(req.session.userId) {
    // check if Authorization header send
    const authHeader = await req.get('Authorization')
    console.log(authHeader)
    if(!authHeader) {
      console.log('no header Auth sent from browser')
      return res.status(401).json({
        success: false,
        error: `You are not logged-in. Please login to access the data.`,
        data: {}
      })
    }

    // check if uid exist
    const uid = authHeader.split(' ')[1] // Eg- Authorization: Bearer ejyjdgjhdgfd
    if(!uid || uid === '') {
      console.log('no token uid sent from browser')
      return res.status(401).json({
        success: false,
        error: `You are not logged-in. Please login to access the data.`,
        data: {}
      })
    }

    if(req.session.userId === req.body.uid) return res.status(401).json({
      success: false,
      error: `You already logged-in. Cannot access said location/url.`,
      data: {}
    })
  }

  // continue
  next()
}

/** Access (FOr Commented Users' only) */
exports.adminAccessPublic = (req, res, next) => {
  if(req.body.key !== process.env.ADMIN_ACCESS_PUBLIC) { 
    if(process.env.NODE_ENV === 'production') return res.redirect('/projects')

    return res.status(401).json({
      success: false,
      error: `Having problem accessing the server. Please try again later.`,
      data: []
    })
  }

  // continue
  next()
}