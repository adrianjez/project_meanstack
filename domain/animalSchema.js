/**
 * Created by adrianjez on 13.06.2017.
 */
var mongoose = require('mongoose');

var AnimalSchema = new mongoose.Schema({
    name: {type:String, unique : true, required : true },
    category:{type: String, default:"NOT_DEFINED"},
    title: String,
    description: String,
    active: {type: Boolean, default: true},
    photo: {type: String}
});

exports.Animals = mongoose.model('animal', AnimalSchema);