var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/surveys'),
    //surveyCtrl = require('../controllers/surveys'),
    //userSurveyCtrl = require('../controllers/user-survey-ctrl'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/surveys', courses.getSurveys);
    app.get('/api/surveys/:id', courses.getSurveyById);
    app.post('/api/surveys', courses.createSurvey);
    app.put('/api/surveys', courses.updateSurvey);
    app.delete('/api/surveys', courses.deleteById);
    app.post('/api/surveys', courses.search);
    //app.get('/api/survey', surveyCtrl.getSurveys);
    //app.get('/api/survey/:id', surveyCtrl.getSurveyById);

    // app.get('/api/user-surveys', userSurveyCtrl.getUserSurveys);
    // app.get('/api/user-surveys/:id', userSurveyCtrl.getUserSurveysById);

    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    app.all('/api/*', function(req, res) {
        res.send(404);
    });

    app.get('*', function(req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}
