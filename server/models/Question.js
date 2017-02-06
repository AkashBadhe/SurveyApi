var mongoose = require('mongoose');

// var responseSchema = new mongoose.Schema({
//     selected: [String],
//     type: { type: String, required: '{PATH} is required!' },
//     options: []
// });

var questionSchema = new mongoose.Schema({
    _id: { type: Number, required: '{PATH} is required!' },
    question: { type: String, required: '{PATH} is required!' },
    response: []
});
var Question = mongoose.model('Question', questionSchema);