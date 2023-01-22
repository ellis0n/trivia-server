const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-h7nja8vBwt8kT5nrLgI6EjIs",
});
const openai = new OpenAIApi(configuration);

const query = async (req, res) => {
  let topic = req.body.topic;
  console.log(topic);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a very difficult trivia question about ${topic} and provide the answer along with two incorrect answers in the following format: {"q": <question>, "a": <answer>, "w1": <wrong-answer1>, "w2": <wrong-answer2>}. `,
      max_tokens: 75,
      //   temperature: 0,
    });
    console.log(response.data.choices[0].text);
    let scrubbedStr = response.data.choices[0].text.replace(/\n/g, "");
    res.status(200).json({
      message: "Query Successful",
      response: scrubbedStr,
    });
  } catch (err) {
    // console.log(err),
    res.status(500).json({
      message: "Query Failed",
      error: err.message,
    });
  }
};

module.exports = {
  query,
};
