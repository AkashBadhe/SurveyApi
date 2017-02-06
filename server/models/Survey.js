var mongoose = require('mongoose');
var Question = require('mongoose').model('Question');

var surveySchema = mongoose.Schema({
    title: { type: String, required: '{PATH} is required!' },
    type: { type: String, require: '{PATH} is required!' },
    published: { type: Date, required: '{PATH} is required!' },
    tags: [String],
    questions: [{ type: Number, ref: 'Question' }]
});
var Survey = mongoose.model('Survey', surveySchema);

// var Response = mongoose.model('Response', responseSchema);

function createDefaultSurveys() {
    Survey.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var question1 = new Question({
                _id: 1,
                question: 'How likely is it that you would recommend this company to a friend or colleague?',
                response: {
                    selected: [],
                    type: 'outof10',
                    options: [{
                        id: 1,
                        title: '',
                    }]
                }
            });
            question1.save(function(err, question) {
                if (err) console.log(err);
                var survey1 = new Survey({
                    title: 'My First Survey',
                    type: 'app',
                    published: new Date('10/12/2013'),
                    questions: [question._id]
                });
                survey1.save(function(err, survey1) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(survey1);
                    }

                })
            });

        }
    });
}

exports.createDefaultSurveys = createDefaultSurveys;
