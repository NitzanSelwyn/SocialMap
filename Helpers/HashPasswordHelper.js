const bcrypt = require('bcryptjs');

exports.EncryptPassword = (password) => {
    return bcrypt.hash(password, 8)
}

exports.IsMatch = (password, incrypyedPass) => {
    return bcrypt.compareSync(password, incrypyedPass)
}