const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-h7nja8vBwt8kT5nrLgI6EjIs",
});
const openai = new OpenAIApi(configuration);

const query = async (req, res) => {
  let question = req.body.question;
  console.log(question);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: question,
      //   max_tokens: 8,
      //   temperature: 0,
    });
    console.log(response);
    res.status(200).json({
      message: "Query Successful",
      response: response.data,
    });
  } catch (err) {
    console.log(err),
      res.status(500).json({
        message: "Query Failed",
        error: err.message,
      });
  }
};

module.exports = {
  query,
};
