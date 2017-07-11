const mongoose = require('mongoose');

const tasteSchema = mongoose.Schema({
    name: { type: String, require: true },
});

const Taste = mongoose.model('Taste', tasteSchema);
module.exports = {Taste};