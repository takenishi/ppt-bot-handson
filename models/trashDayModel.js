const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TrashDaySchema = new Schema({
    _id: String,
    type: String,
    area: String,
    trashDay: String
});

module.exports = mongoose.model('trash_days', TrashDaySchema);