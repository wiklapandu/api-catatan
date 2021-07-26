const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    tags: {
        type: Array,
    },
    body: {
        type: String,
        require: true,
    },
    createdAt: String,
    updatedAt: String,
});

const notes = mongoose.model('Notes', notesSchema);

module.exports = notes;
