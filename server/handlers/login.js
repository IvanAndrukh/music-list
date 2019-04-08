const passwordHash = require('password-hash');

const { User } = require('../db');
const { jwt } = require('../services');

module.exports = async (req, res, next) => {
	try {
		const { login, password } = req.body;

		const user = await User.findOne({ login });

		if (!user) throw new Error(`The user with ${login} login does not exist`);

		const validPassword = passwordHash.verify(password, user.password);

		if (!validPassword) throw new Error('Enter correct passsword');

		const token = jwt.create({ id: user._id  });

		return res.status(200).json({ login: user.login, token });
	} catch (error) {
		res.status(400);
		next(error);
	}
};
