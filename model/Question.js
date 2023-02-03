const mongoose = require('mongoose')
mongoose.set('strict', true)
const Schema = mongoose.Schema

const questionSchema = new Schema({
    prompt: { type: 'String', required: true },
    answer: { type: 'String', required: true },
})
module.exports = mongoose.model('Question', questionSchema)
