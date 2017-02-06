var Survey = require('mongoose').model('Survey');

exports.getSurveys = function(req, res) {
  Survey.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getSurveyById = function(req, res) {
  Survey.findOne({_id:req.params.id}).exec(function(err, survey) {
    res.send(survey);
  })
}