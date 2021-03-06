const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rouletteSchema = new Schema(
{
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		default: ''
	},
	host: {
		type: String,
		required: true,
		unique: true
	},
	private: {
		type: Boolean,
		default: true
	},
	currency: {
		type: Object,
		symbold: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	color: {
		type: String,
		required: true,
		default: '#0492F2'
	},
	modes: [{type: Schema.Types.ObjectId, ref: 'Mode'}],
	gameFunctionForMode: [
		{
			mode: {type: Schema.Types.ObjectId, ref: 'Mode'},
			gameFunc: {
				type: String,
			},
		}
	],
	functions: {
		type: Object,
		authValidationRuleFunction:
		{
			type: String,
			default: '',
		},
		balanceParseFunction:
		{
			type: String,
			default: '',
		},
		referalChangeFunction:
		{
			type: String,
			default: '',
		},
	},
	referal: {
		type: Object,
		url: '',
		refType: '',
		code: '',
	},
	created_at: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('Roulette', rouletteSchema);