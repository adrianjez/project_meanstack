/**
 * Created by adrianjez on 13.06.2017.
 */
var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    subject: String,
    email: {type: String, required: true},
    message: String,
    date: Date,
    read: Boolean
});

exports.Questions = mongoose.model('question', QuestionSchema);