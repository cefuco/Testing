const bcrypt = require('bcrypt');

const handleHashPassword = async (password) => {
    const passwordHash = await bcrypt.hash(String(password), 10)
    return passwordHash
}


const handleVerifyPasswordHash = async (password, passwordHash) => {
    const match = await bcrypt.compare(String(password), passwordHash);
    return match
}


module.exports = {
    handleHashPassword,
    handleVerifyPasswordHash
}