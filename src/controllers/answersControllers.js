const Answers = require('../models/Answers');

async function markAnswerHelpful(req, res) {
  const { answer_id } = req.params;
  const data = await Answers.helpful(Number(answer_id));
  res.send(data);
}

async function reportAnswer(req, res) {
  const { answer_id } = req.params;
  const data = await Answers.report(Number(answer_id));
  res.send(data);
}

module.exports.markAnswerHelpful = markAnswerHelpful;
module.exports.reportAnswer = reportAnswer;
