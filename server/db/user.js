const mongoose = require('mongoose');
const passwordHash = require('password-hash');

const { Schema } = mongoose;


const userSchema = new Schema({
	login: {
		type: String,
		required: [true, 'Login is not entered'],
		trim: true
	},
	password: {
		type: String,
		required: [true, 'Password is not not entered'],
		set(password) {
			return passwordHash.generate(password);
		}
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
})

module.exports = mongoose.model('User', userSchema);
