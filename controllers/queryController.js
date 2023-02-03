const { Configuration, OpenAIApi } = require('openai')
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_KEY,
})
const openai = new OpenAIApi(configuration)
const Question = require('../model/Question')

const query = async (req, res) => {
    let topic = req.body.topic
    console.log(topic)

    // Break this out into a collection of prompts to be referenced by the user
    const prompt = `Generate a concise but challenging trivia question about "${topic}". Provide the answer along with three incorrect but plausible answers in the following format: {"q": value, "a": value, "w1": value, "w2": value, "w3": value}. `

    try {
        const queryAI = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 75,
            //   temperature: 0,
        })
        const answer = queryAI.data.choices[0].text
        console.log(answer)
        let scrubbedStr = answer.replace(/\n/g, '')

        // await Question.create({
        //     prompt: prompt,
        //     answer: answer,
        // })
        res.status(200).json({
            message: 'Query Successful',
            response: scrubbedStr,
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
