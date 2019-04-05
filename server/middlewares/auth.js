const { User } = require('../db');
const { jwt } = require('../services');

module.exports = async (req, res, next) => {
	try {
		if (!req.headers.authorization) throw new Error('No authorization token');

		const token = req.headers.authorization.replace('Bearer', '').trim();
		const decodedToken = jwt.verify(token);

		const user = await User.findOne({ login: decodedToken.login });
		req.user = user;

		return next();
	} catch (error) {
		res.status(401).send(error.message);
		next(error);
	}
};
