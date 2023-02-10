const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_KEY,
})
const openai = new OpenAIApi(configuration)
const Question = require('../model/Question')
const Prompt = require('../model/Prompt')

const reqFormatter = (inputStr) => {
    const convertedInputStr = inputStr.replace(/\n/g, '').replace(/['"']/g, '').split(' -- ')
    return convertedInputStr
}

const query = async (req, res) => {
    let { topic, check } = req.body.data
    // console.log(topic)
    // console.log(check)

    // Break this out into a collection of prompts to be referenced by key name
    const prompt = [
        {
            name: 'prompt-1',
            prompt: `Generate a concise but challenging trivia question about "${topic}". Provide the answer along with three incorrect but plausible answers in the following format precisely: question -- correctAnswer -- wrongAnwser -- wrongAnwser -- wrongAnwser`,
        },
        {
            name: 'prompt-2',
            prompt: `Generate a concise but challenging trivia question on a new topic related to "${topic}". Provide the answer along with three incorrect but plausible answers in the following format:  question -- correctAnswer -- wrongAnwser -- wrongAnwser -- wrongAnwser`,
        },
    ]

    try {
        let promptCategory
        if (req.body.check === true) {
            promptCategory = prompt[1]
        } else {
            promptCategory = prompt[0]
        }

        const queryAI = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: promptCategory.prompt,
            max_tokens: 100,
            //   temperature: 0,
        })

        const answer = reqFormatter(queryAI.data.choices[0].text)
        console.log(queryAI.data.choices[0].text)
        const saveQuestion = await Question.create({
            prompt: promptCategory.name,
            topic: topic,
            answer: answer.toString(),
        })

        res.status(200).json({
            message: 'Query Successful',
            response: answer,
        })
    } catch (err) {
        // console.log(err),
        res.status(500).json({
            message: 'Query Failed',
            error: err.message,
        })
    }
}

module.exports = {
    query,
}
