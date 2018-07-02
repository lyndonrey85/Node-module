const Users = require('../controllers/users');

module.exports = function(app){
    app.get('/', Users.homepage);
    app.post('/users', Users.create);
    app.post('/users/confirm', Users.confirm);
    app.get('/session', Users.loggedIn);
    app.delete('/session', Users.logout);
}