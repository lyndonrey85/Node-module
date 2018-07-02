const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const port = 8000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');

app.use(express.static(__dirname + '/client/static'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
    secret: 'sashayaway',
    resave: false,
    saveUninitialized: true
}))

//requiring mongoose
require('./server/config/mongoose');


//requiring my routes
require('./server/config/routes')(app);








app.listen(8000, function() {
    console.log("listening on port 8000");
   });