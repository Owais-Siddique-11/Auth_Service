const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

dotenv.config();
module.exports = {
    PORT : process.env.PORT,
    SALT : bcrypt.getSaltSync(10),
    JWT_KET : process.env.JWT_KEY
}