const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: { type: String, require: true },
    taste: { type: String, require: true }
});

module.exports = mongoose.model('Category', categorySchema);