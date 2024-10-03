const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true }
})

const User = model('User', UserSchema)

module.exports = User