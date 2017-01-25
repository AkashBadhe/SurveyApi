var mongoose = require('mongoose');

var userSurveySchema = mongoose.Schema({
    user_id: { type: String, required: '{PATH} is required!' },
    surveys: [{
            title: { type: String, required: '{PATH} is required!' },
            type: { type: String, require: '{PATH} is required!' },
            published: { type: Date, required: '{PATH} is required!' },
            tags: [String],
            questions: [{
                    question_id: { type: Number, required: '{PATH} is required!' },
                    question: { type: String, required: '{PATH} is required!' },
                    response: {
                        selected: [String],
                        type: { type: String, required: '{PATH} is required!' },
                        options : [{
                                id: { type: Number },
                                title: { type: String }
                            }
                        ]
                    }
                }]
        }]
});
var Survey = mongoose.model('Survey', surveySchema);

function createDefaultSurveys() {
    Survey.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            Survey.create({
                title: 'My First Survey',
                type: 'app',
                published: new Date('10/12/2013'),
                tags: ['app', 'feedback'],
                questions: [
                    {
                        question_id: 1,
                        question: 'How likely is it that you would recommend this company to a friend or colleague?',
                        response: {
                            selected: ['6'],
                            type: 'outof10',
                            options : [{
                                    id: 1,
                                    title: '',
                                }]
                        }
                    },
                    {
                        question_id: 2,
                        question: 'Overall, how satisfied or dissatisfied are you with our company?',
                        response: {
                            selected: ['3'],
                            type: 'radio',
                            options : [{
                                    id: 1,
                                    title: 'Very Satisfied',
                                },
                                {
                                    id: 2,
                                    title: 'Somewhat Satisfied',
                                },
                                {
                                    id: 3,
                                    title: 'Nither Satisfied Nor Dissatisfied',
                                },
                                {
                                    id: 4,
                                    title: 'Not Satisfied',
                                },
                                {
                                    id: 5,
                                    title: 'Very much not Satisfied',
                                }]
                        }
                    },
                    {
                        question_id: 2,
                        question: 'What did you like about us',
                        response: {
                            selected: ['1', '3', '4'],
                            type: 'radio',
                            options : [{
                                    id: 1,
                                    title: 'Responsiveness',
                                },
                                {
                                    id: 2,
                                    title: 'Professionalism',
                                },
                                {
                                    id: 3,
                                    title: 'Politeness',
                                },
                                {
                                    id: 4,
                                    title: 'Knowledge of the problem',
                                },
                                {
                                    id: 5,
                                    title: 'Manner of handling follow - up questions',
                                }]
                        }
                    }
                ],

            });
        }
    })
}

exports.createDefaultSurveys = createDefaultSurveys;