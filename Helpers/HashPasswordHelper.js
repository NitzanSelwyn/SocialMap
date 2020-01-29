const bcrypt = require('bcryptjs');

exports.EncryptPassword = (password) => {
    return bcrypt.hash(password, 8)
}