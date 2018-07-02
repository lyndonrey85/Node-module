var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/message-board');
mongoose.Promise = global.Promise;


var MessageSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 6},
    messagePost: {type: String, required: true, minlength: 6},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
   }, {timestamps: true});



// // define Comment Schema
var CommentSchema = new mongoose.Schema({
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    text: {type: String, required: true }
   }, {timestamps: true });
   // set our models by passing them their respective Schemas
   mongoose.model('Message', MessageSchema);
   mongoose.model('Comment', CommentSchema);
   // store our models in variables
   var Message = mongoose.model('Message');
   var Comment = mongoose.model('Comment');






   // Routes
// Root Request
app.get('/', function(req, res) {
    Message.find({}, function(err1, message) {
        if(err1) {
            res.render('index.ejs', {errors: message.errors})
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully added a message!');
          res.render('index.ejs');
        }
      })
})


app.get("/", function(req, res) {
	Message.find({}, false, true).populate('_comments').exec(function(err, messages) {
	      res.render('index.ejs', { messages: messages });
	});
});




//**my original root route */
// route for getting a particular post and comments
app.get('/', function (req, res){
    Message.findOne({_id: req.params.id})
    .populate('comments')
    .exec(function(err, message) {
        console.log(message);
        
         res.render('index.ejs', {message: message});
           });
   });

   //**my original create message route
app.post('/addMessage', function (req, res){
    Message.create(req.body, function(err, result){
        if (err){
            console.log(err);
        }
        console.log("here are the messages bro");
        console.log(Message);
        res.redirect('/');
    })
});

app.post("/message", function(req, res){
	var newMessage = new Message({ name: req.body.name, message: req.body.message });
	newMessage.save(function(err) {
		if (err) {
			console.log(err);
			res.render('index.ejs', { errors: newMessage.errors });
		} else {
			console.log("success");
			res.redirect('/');
		}
	})
})

app.post('/comments', function (req, res){
    console.log("POST DATA", req.body);
    Message.findOne({_id: req.params.id}, function(err, message){
           var comment = new Comment(req.body);
           comment._message = message._id;
           message.comments.push(comment);
           comment.save(function(err){
            console.log("here is the comment");
            console.log(comment);
                message.save(function(err){
                    console.log("here is the message");
                    console.log(message);
                         if(err) { console.log('Error'); } 
                         else { res.redirect('/'); }
                   });
           });
     });
   });

app.post("/comment/:id", function(req, res) {
	const messageId = req.params.id;
	Message.findOne({ _id: messageId }, function(err, message) {
		const newComment = new Comment({ name: req.body.name, text: req.body.comment });
		newComment._message = message._id;
		Message.update({ _id: message._id }, { $push: { _comments: newComment }}, function(err) {

		});
		newComment.save(function(err) {
			if (err) {
				console.log(err);
				res.render('index.ejs', { errors: newComment.errors });
			} else {
				console.log("comment added");
				res.redirect("/");
			}
		});
	});
});




app.post('/', function(req, res) {
    console.log("POST DATA", req.body);
    var message = new Message(req.body);
    
    message.save(function(err) {
        if(err) {
            res.render('index.ejs', {errors: messages.err})
        } else {
          console.log('successfully added a message!');
          res.render('index.ejs');
        }
      })    
    
})



const Schema = mongoose.Schema;
const MessageSchema = new mongoose.Schema({
	name: String,
	message: String,
	_comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

MessageSchema.path('name').required(true, 'Name cannot be blank');
MessageSchema.path('message').required(true, 'Message cannot be blank');
mongoose.model("Message", MessageSchema);

const Message = mongoose.model("Message");
const CommentSchema = new mongoose.Schema({
	name: String,
	text: String,
	_message: {type: Schema.Types.ObjectId, ref: 'Message'}
});

CommentSchema.path('name').required(true, 'Name cannot be blank');
CommentSchema.path('text').required(true, 'Comment cannot be blank');
mongoose.model("Comment", CommentSchema);

const Comment = mongoose.model("Comment")

app.listen(8000, function() {
	console.log("listening on port 8000");
})
