const mongoose = require('mongoose');

const tasteSchema = mongoose.Schema({
    name: { type: String, require: true },
});

module.exports = mongoose.model('Taste', tasteSchema);