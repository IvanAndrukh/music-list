const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const verify = (token) => jwt.verify(token, jwtSecret);

const create = ({ id, login }) => jwt.sign({ id, login }, jwtSecret, { expiresIn: '2w' });

module.exports = { verify, create };
