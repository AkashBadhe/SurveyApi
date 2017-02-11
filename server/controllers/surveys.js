var Survey = require('mongoose').model('Survey');
var Question = require('mongoose').model('Question');

exports.getSurveys = function(req, res) {
  Survey.find({}).populate('questions').exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getSurveyById = function(req, res) {
  Survey.findOne({_id:req.params.id}).exec(function(err, course) {
    res.send(course);
  })
}

exports.createSurvey = function(req, res, next) {
    var survey = req.body,
    	questions = [];
    if (!_.isEmpty(survey)) {
    	questions = survey.questions;
    	survey.questions = [];
    	questions.forEach( function(element, question) {
    		var que = new Question(question);
    		que.save(function(err, question) {
                if (err) console.log(err);
            	survey.questions.push(questions._id);
            });
    	});

        Survey.save(function(err, survey) {
            if (err) {
                res.status(400);
                return res.send({ reason: err.toString() + 'thanku for visiting books.com' });
            } else {
                res.status(201);
                res.send(survey);
            }
        });
    } else {
        res.status(400);
        return res.send('Empty object');
    }
}

exports.updateSurvey = function(req, res, next){
	var id = req.params._id || req.body._id;
	Survey.findByIdAndUpdate(id,{$set:req.body}, function(err, result){
        if(err){
            console.log(err);
        }
        console.log("RESULT: " + result);
        res.status(200);
        res.send(result);
    });
}

exports.deleteSurvey = function(req, res, next) {
    var id = req.params._id || req.body._id;
    console.log('Deleting book: ' + id);
    Survey.remove({ _id: id }, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        res.status(200);
    }
});
}