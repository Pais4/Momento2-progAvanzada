const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let guestschema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is necessary']
    },
    lastName: {
        type: String, 
        required: [true, 'Last name is necessary']
    },
    rate: {
        type: Number,
        default: 'INDIVIDUAL'
    },
    numberOfPeople: {
        type: Number,
        default: 1
    },
    numberOfDays: {
        type: Number, 
        default: 1
    }

});

module.exports = mongoose.model('Guests', guestschema);