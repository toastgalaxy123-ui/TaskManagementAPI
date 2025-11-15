const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply the 'protect' middleware to ALL routes defined below
router.use(protect);

router.route('/')
    .get(getTasks)    // GET /api/tasks
    .post(createTask); // POST /api/tasks

router.route('/:id')
    .put(updateTask)    // PUT /api/tasks/:id
    .delete(deleteTask); // DELETE /api/tasks/:id

module.exports = router;