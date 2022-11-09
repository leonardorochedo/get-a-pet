const mongoose = require('../db/conn')
const { Schema } = mongoose

// Create a collection
const Pet = mongoose.model(
    'Pet',
    new Schema({
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        images: {
            type: Array, // Array of images
            required: true
        },
        available: {
            type: Boolean,
        },
        user: Object,
        adopter: Object
    }, { timestamps: true } // createdAt and updatedAt
    )
)

module.exports = Pet