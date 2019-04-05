const { User } = require('../db');

module.exports = async (req, res, next) => {
	try {
		const { login, password, passwordConfirm } = req.body;

		if (password !== passwordConfirm) throw new Error('Password doesn\'t match');

		const userExist = await User.findOne({ login });

		if (userExist) throw new Error(`The user with login: ${login} has already exist`);

		await User.create({ login, password });

		return res.status(201).send('The user was successfully created');
	} catch (error) {
		res.status(400).send(error.message);
		next(error);
	}
};
