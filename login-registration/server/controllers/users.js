const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");

class UsersController {
    homepage(req, res) {
        return res.render('index');
    }
    create(req, res) {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        User.create(req.body, (err, user) => {
            if(err) {
                console.log(err);
            }
            req.session.user_id = user._id;
            return res.json(user);
        })
    }
    confirm(req, res) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if(err) {
                console.log(err);
            }
            if(user && user.compare(req.body.password)) {
                req.session.user_id = user._id;
                return res.json(user);
            }
            return res.json({
                'errors': 'You are not who you say you are'
            });
        })
    }
    loggedIn(req, res) {
        if(req.session.user_id) {
            // return redirect
            return res.json({
                'currently': 'logged in'
            })
        } else {
            // return redirect
            return res.json({
                'currently': 'not logged in'
            })
        }
    }
    logout(req, res) {
        delete req.session.user_id;
        // return redirect('/');
        return res.json({
            'status': true
        })
    }
}

module.exports = new UsersController();