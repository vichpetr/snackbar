const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const AvatarSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    pictype: { type: String, required: true },
    pic: { type: String, required: true }
}, { collection : 'avatar' });

const Avatar = mongoose.model('Avatar', AvatarSchema);

module.exports = Avatar;