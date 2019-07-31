const taskRoutes = require('./task.route');
const express = require('express');
const router = express.Router();

router.use('/task', taskRoutes);

module.exports = router;