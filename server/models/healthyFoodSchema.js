const mongoose = require('mongoose');

const healthyFoodsSchema = mongoose.Schema({
    name: { type: String, require: true },
    correspondingUnhealthyFood: { type: String, require: true }
});

module.exports = mongoose.model('healthyFoods', healthyFoodsSchema);