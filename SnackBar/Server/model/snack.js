const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const SnackSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: {type: Number, required: true},
    owner: {type: Number, required: true},
    pictype: { type: String, required: true },
    pic: { type: String, required: true }
}, { collection : 'snacks' });

const Snack = mongoose.model('Snack', SnackSchema);

module.exports = Snack;