const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id: String,
    username: String,
    name: String,
    midSha256: String,
    area: String,
});
module.exports = mongoose.model('users', UserSchema);