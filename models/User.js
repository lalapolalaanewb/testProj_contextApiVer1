/** Dependencies */
// Mongoose
const mongoose = require('mongoose')

/** Page Specific Functions */
// Allow empty string for name.firstName
function firstNameRequired() {
  let state = this.name.firstName
  return typeof state === 'string' ? false : true
}
// Allow empty string for name.nickName
function lastNameRequired() {
  let state = this.name.lastName
  return typeof state === 'string' ? false : true
}
// Allow empty string for name.nickName
function nickNameRequired() {
  let state = this.name.nickName
  return typeof state === 'string' ? false : true
}
// Allow empty string for emails.main
function mainEmailRequired() {
  let state = this.credentials.emails.main
  return typeof state === 'string' ? false : true
}
// Allow empty string for emails.backup
function backupEmailRequired() {
  let state = this.credentials.emails.backup
  return typeof state === 'string' ? false : true
}

/** Data Schema */
const UserSchema = new mongoose.Schema({
    // User's Name
    name: {
        // User's Firstname
        firstName: { type: String, trim: true, required: firstNameRequired },
        // User's Lastname
        lastName: { type: String, trim: true, required: lastNameRequired },
        // User's Nickname
        nickName: { type: String, trim: true, required: nickNameRequired }
    },
    credentials: {
        // User's Emails
        emails: {
          // Main Email
          main: { type: String, trim: true, required: mainEmailRequired },
          // Backup Email
          backup: { type: String, trim: true, required: backupEmailRequired }
        },
        // User's Password
        password: { type: String, trim: true, required:true, min: 6 },
    },
    // User's Status (0 = Admin, 1 = Seller, 2 = Customer)
    status: { type: Number, required: true, default: 0 }
}, { timestamps: true })

/** Exports */
module.exports = mongoose.model('User', UserSchema)