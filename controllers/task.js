const { task } = require('../models');

module.exports = { createTask, returnTasks, deleteAll, updateTask, deleteTask };

function createTask(req, res, next) {
    const payload = req.body;

    return task.create(payload)
        .then(doc => {
            res.json({ok: 'ok'})
        })
}

function returnTasks(req, res) {
    return task.find({}, 'title done createdAt', (err, tasks) => {
        (err) ? console.error(err) : 
        // console.log(typeof task);
        // res.json(tasks)
        (!tasks.length) ? res.send("no tasks yet!") : 
        res.send(tasks.reduce((acc, it, i) => {
            return `${acc}${it.title}: ${(it.done) ? 'Done!' : 'Not done yet!'}\ndate:${it.createdAt}\t=====\tid: ${it.id}\n`
        }, ''))
    });
}

function deleteAll(req, res) {
    return task.remove({}, () => res.send('deleted'));
}

function deleteTask(req, res) {
    return task.find({_id: req.params.id}, (err, docs) => {
        if (err) {
            return res.json({status: 400, message: err.message});
        }
        if (!docs.length) {
            return res.send(400, "Wrong id!");
        }
    })
        .then(() => {task.remove({_id: req.params.id}, () => res.send('deleted'))
        .catch(e => {
            console.error(e);
            res.send(e.message);
        })});
}

function updateTask(req, res) {
    task.update({_id: req.params.id}, {done: req.body.done}, (err, upd) => {
        if (err) {
            console.error(404 ,err);
            return res.send(`404\n${err.message}`);
        }
        return res.send('updated!');
    })
}