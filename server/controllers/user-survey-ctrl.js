var userSurvey = require('mongoose').model('UserSurvey');

exports.getUserSurveys = function(req, res) {
  userSurvey.find({}).exec(function(err, collection) {
    res.send(collection);
  })
};

exports.getUserSurveysById = function(req, res) {
  userSurvey.findOne({_id:req.params.id}).exec(function(err, survey) {
    res.send(survey);
  })
}