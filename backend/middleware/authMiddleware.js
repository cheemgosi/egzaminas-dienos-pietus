const bcrypt = require('bcrypt');
const Admin = require('../models/Admin.js');

async function authenticateAdmin(username, password, done) {
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return done(null, false);

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) return done(null, false);

    return done(null, admin);
  } catch (err) {
    return done(err);
  }
}

module.exports = authenticateAdmin;
