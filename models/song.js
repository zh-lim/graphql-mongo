const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema({
	name: String,
	// genre: String,
	content: String,
	// id is automatically created by mongodb
});

module.exports = mongoose.model("Song",songSchema);