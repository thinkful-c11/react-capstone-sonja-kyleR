const mongoose = require('mongoose');

const unhealthyFoodsSchema = mongoose.Schema({
    name: { type: String, require: true },
    taste: { type: String, require: true },
    category: { type: String, require: true }
});

module.exports = mongoose.model('UnhealthyFoods', unhealthyFoodsSchema);