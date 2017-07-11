const mongoose = require('mongoose');

const unhealthyFoodsSchema = mongoose.Schema({
    name: { type: String, require: true },
    taste: { type: String, require: true },
    category: { type: String, require: true }
});

const UnhealthyFoods = mongoose.model('UnhealthyFoods', unhealthyFoodsSchema);
module.exports = {UnhealthyFoods};