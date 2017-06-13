/**
 * Created by adrianjez on 13.06.2017.
 */
var mongoose = require('mongoose');
var sha1 = require('sha1');

var UsersSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    admin: { type: Boolean, default: false },
    // priviledge:  {type: Number, required: true, default: 0 },
    active: { type: Boolean, required: true, default: false }
    // activate_code: { type: String, unique: true }
});

UsersSchema.methods.validPassword = function (pass, callback) {
    return sha1(pass)==this.password;
};

exports.Users = mongoose.model('users', UsersSchema);
