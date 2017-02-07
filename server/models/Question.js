var mongoose = require('mongoose');

// var responseSchema = new mongoose.Schema({
//     selected: [String],
//     type: { type: String, required: '{PATH} is required!' },
//     options: []
// });

var questionSchema = mongoose.Schema({
    _id: { type: Number },
    question: { type: String, required: '{PATH} is required!' },
    response: []
});
var Question = mongoose.model('Question', questionSchema);