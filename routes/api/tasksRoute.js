const router = require('express').Router();

const Task = require('../../models/Task');

// @route  GET api/tasks/:googleId
// @desc   GET all tasks
// @access Public
router.get('/:googleId', (req, res) => {
  Task.find({ googleId: req.params.googleId, timer: "25" })
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
    note: req.body.note,
    googleId: req.body.googleId
  });

  newTask.save().then(task => res.json(task));
})

module.exports = router;