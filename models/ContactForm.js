const mongoose = require('mongoose');


const ContactFormSchema = new mongoose.Schema({
    name: {
        type:String,
        require: true,
    },
    email: {
        type:String,
        require: true,
        unique:true,
    },
    message: {
        type:String,
        require: true,
    }
});

module.exports = mongoose.model('Contact' ,ContactFormSchema);