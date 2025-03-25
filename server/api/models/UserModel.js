const mongoose = require('mongoose');

const { Schema }  = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Name cannot be blank'
        },
        email: {
            type: String,
            required: 'Email cannot be blank'
        },
        password: {
            type: String,
            required: 'Password cannot be blank'
        },
        role: {
            type: String,
            enum: ['admin', 'student'],
            default: 'student'
        }
    },
    { collection: 'Users'}
);

module.exports = mongoose.model('User', UserSchema);