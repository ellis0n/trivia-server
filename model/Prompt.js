const mongoose = require('mongoose')
mongoose.set('strict', true)
const Schema = mongoose.Schema

const promptSchema = new Schema({
    name: { type: 'String', required: true },
    prompt: { type: 'String', required: true },
})
module.exports = mongoose.model('Prompt', promptSchema)
