const express = require('express');
const router = express.Router();

const Task = require('../../models/Task');

// @route  GET api/tasks
// @desc   GET all tasks
// @access Public
router.get('/', (req, res) => {
  Task.find()
    .sort({ date: -1 })
    .then(tasks => res.json(tasks))
})

// @route  POST api/tasks
// @desc   post a task
// @access Public
router.post('/', (req, res) => {
  // new Task object to save
  const newTask = new Task({
    objective: req.body.objective,
    timer: req.body.timer,
    completed: req.body.completed,
    rating: req.body.rating,
    note: req.body.note
  });

  newTask.save().then(task => res.json(task));
})

// @route  DELETE api/tasks/:id
// @desc   delete a task
// @access Public
router.delete('/:id', (req, res) => {
  Task.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }))
})





module.exports = router;