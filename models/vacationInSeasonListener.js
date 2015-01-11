var mongoose = require('mongoose');

var vacationInSeasonListernerSchema = mongoose.Schema({
	email: String,
	skus: [String],
});
var VacationInSeasonListener = mongoose.model('VacationInSeasonListener', vacationInSeasonListernerSchema);

module.exports = VacationInSeasonListener;