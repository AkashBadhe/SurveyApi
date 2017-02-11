var Survey = require('mongoose').model('Survey');
var Question = require('mongoose').model('Question');
var _ = require('lodash');
exports.getSurveys = function(req, res) {
    Survey.find({}).populate('questions').exec(function(err, collection) {
        console.log(collection);
        res.send(collection);
    })
};

exports.getSurveyById = function(req, res) {
    Survey.findOne({ _id: req.params.id }).exec(function(err, course) {
        res.send(course);
    })
}

exports.createSurvey = function(req, res, next) {
    var survey = req.body,
        questions = [];
    if (!_.isEmpty(survey)) {
        questions = survey.questions;
        survey.questions = [];
        questions.forEach(function(question, index) {
            var que = new Question(question);
            que.save(function(err, question) {
                if (err) console.log(err);
                survey.questions.push(question.id);
                if (index === questions.length - 1) {
                    if (survey._id) {
                        delete survey._id;
                    }

                    var surveryInstance = new Survey(survey);
                    surveryInstance.save(function(err, survey) {
                        if (err) {
                            res.status(400);
                            return res.send({ reason: err.toString() });
                        } else {
                            res.status(201);
                            res.send(survey);
                        }
                    });
                }
            });
        });


    } else {
        res.status(400);
        return res.send('Empty object');
    }
}

exports.updateSurvey = function(req, res, next) {
  var itemId = req.body._id;
    delete req.body._id;
    Survey.findOneAndUpdate({_id : itemId}, { $set: req.body }, function(err, doc) {
        if (err) { res.status(400);
            return res.send({ reason: err.toString() }); }
        res.send(doc);
    });
}

exports.deleteById = function(req, res) {
    Survey.remove({ _id: req.body._id }, function(err, survey) {
        res.send(survey);
    })
}

exports.search = function(req, res) {
    Survey.find({title: req.body.searchTerm}, function(err, result){
      res.status(200);
      res.send(result);
    })
}
