const express = require('express');
const router = express.Router();
const ExpressJoi = require('express-joi-validator');
const Joi = require('joi');

const taskController = require('../controllers/task');

const postValidatorSchema = {
    body: {
        title: Joi.string().required(),
        done: Joi.boolean().required()
    }
}

const putValidationSchema = {
    body: {
        done: Joi.boolean().required()
    }
}

router.post('/', ExpressJoi(postValidatorSchema), taskController.createTask);
router.get('/', taskController.returnTasks);
router.delete('/:id', taskController.deleteTask);
router.delete('/', taskController.deleteAll);
router.put('/:id', ExpressJoi(putValidationSchema), taskController.updateTask);

router.use(function (err, req, res, next) {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
});

module.exports = router;