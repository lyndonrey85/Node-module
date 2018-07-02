var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/mongoose-dashboard');
mongoose.Promise = global.Promise;

var AnimalSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    region: {type: String, required: true, minlength: 2},
    species: {type: String, required: true, minlength: 2}
   }, {timestamps: true});

mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');

app.get('/', function(req, res) {
Animal.find({}, function(err, results) {
    if(err) {
        console.log(err);
    } 
    res.render('index', {animals: results} );  
    })
})

app.get('/new', function(req, res) {
    Animal.find({}, function(err, animals) {
        if(err) {
            res.render('new', {errors: animals.errors})
        } else { 
          res.render('new', {animals: animals});
        }
      })
})

app.post('/mongooses', function(req, res) {
    console.log("POST DATA", req.body);
    Animal.create(req.body, function(err, result) {
        if (err){
            console.log(err);
        }
        res.redirect('/');
      })      
})

app.get('/mongooses/:id', function(req, res) {
    Animal.find({ _id: req.params.id}, function(err, animals) {
        if(err) {
            console.log(err);
        } else { 
          res.render('show', { animals: animals[0] } );
        }
      })
})

app.post('/mongooses/:id', function(req, res) {
    Animal.find({_id: req.params.id}, function(err, response) {
        if (err){
            console.log(err);
        }
        res.render('edit', {animal: response[0]})
    })
})

app.post('/mongooses/edit/:id', function(req, res) {
    Animal.update({_id: req.params.id }, req.body,  function(err){
        if (err){
            console.log(err);
        }
        res.redirect('/');
    })
})

app.post('/mongooses/destroy/:id', function(req, res) {
    Animal.remove({_id: req.params.id }, function(err, result){
        if (err){
            console.log(err);
        }
        res.redirect('/');
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
   });