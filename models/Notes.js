const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId, //to make foreign key of user and put a reference of user model
            ref: 'user'
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        tag: {
            type: String,
            default: "General"
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('notes', notesSchema) //notes is the name of collection to be created in database