const mongoose = require('mongoose');
const bcryptJs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    
    name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    }

});

UserSchema.pre('save' ,(next) => {
    if (this.email) {
        this.email = this.email.toLowerCase();
    }
    next();
});


module.exports = mongoose.model('User' , UserSchema);
