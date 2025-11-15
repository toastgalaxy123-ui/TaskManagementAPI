const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        // This is the Foreign Key (reference) to the User model
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Links this field to the 'User' model
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    dueDate: {
        type: Date,
        required: false,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Task', TaskSchema);