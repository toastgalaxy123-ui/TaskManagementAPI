const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Get all tasks for the authenticated user
// @route   GET /api/tasks
// @access  Private (Protected by authMiddleware)
const getTasks = asyncHandler(async (req, res) => {
    // Only fetch tasks where the 'user' field matches the authenticated user ID
    const tasks = await Task.find({ user: req.user.id }); 
    res.status(200).json(tasks);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
        res.status(400);
        throw new Error('Please add a title field');
    }

    const task = await Task.create({
        user: req.user.id, // Assign ownership to the logged-in user
        title,
        description,
        status,
        priority,
        dueDate,
    });

    res.status(201).json(task);
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Security Check: Ensure the logged-in user owns the task
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to update this task');
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
    });

    res.status(200).json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Security Check: Ensure the logged-in user owns the task
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to delete this task');
    }

    await Task.deleteOne({ _id: req.params.id }); 

    res.status(200).json({ id: req.params.id, message: 'Task removed' });
});

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};