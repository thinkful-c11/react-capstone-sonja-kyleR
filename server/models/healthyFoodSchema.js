const mongoose = require('mongoose');

const healthyFoodsSchema = mongoose.Schema({
    name: { type: String, require: true },
    correspondingUnhealthyFood: { type: String, require, true }
});

const healthyFoods = mongoose.model('healthyFoods', healthyFoodsSchema);
module.exports = {healthyFoods};