var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
let port = 8000;
var app = express();
var count = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(
    session({
        secret: 'aj5nzngf3',
        resave: false,
        saveUninitialized: true,
    })
);

let server = app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
    res.render('index', { count });
});

let io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
    console.log('New socket connection');
    console.log(`Socket ID: ${socket.id}`);

    socket.on('count_clicked', () => {
        console.log('Count button clicked');
        count++;
        io.emit('count_response', { response: count });
    });

    socket.on('reset_clicked', () => {
        console.log('Reset button clicked');
        count = 0;
        io.emit('reset_response', { response: count });
    });
});
