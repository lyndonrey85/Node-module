const mongoose = require('mongoose');
const Task = mongoose.model('Task');

class TasksController {
    index(req, res) {
        Task.find({}, (err, tasks) => {
            if(err) {
                return res.json(err);
            }
            return res.json(tasks);
        })
    }
    create(req, res) {
        Task.create(req.body, (err, tasks) => {
            if(err) {
                return res.json(err);
            }
            return res.json(tasks);
        })
    }
    show(req, res) {
        // req.params.id
        Task.findById(req.params.id,(err, tasks) => {
            if(err) {
                return res.json({ error: 'You are wrong!!'});
            }
            return res.json(tasks);
        })
    }
    update(req, res) {
        Task.findByIdAndUpdate(req.params.id, { $set : req.body }, { new: true}, (err, tasks) => {
            if(err) {
                return res.json({ error: 'Girl you are wrong'});
            }
            return res.json(tasks);
        })
    }
    destroy(req, res) {
        Task.findByIdAndRemove(req.params.id, (err, tasks) => {
            if(err) {
                return res.json({ error: 'I said you are wrong!!'});
            }
            return res.json({
                'success': 'success, she gone!!'
            });
        })
    }
}

module.exports = new TasksController();