const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: String,
    done: Boolean,
    createdAt: {type: Schema.Types.Date, default: Date.now()}
});

module.exports = mongoose.model('Task', TaskSchema);