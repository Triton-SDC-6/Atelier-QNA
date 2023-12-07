const Questions = require('../models/Questions');
const Answers = require('../models/Answers');

async function getAll(req, res) {
  const { product_id, page = 1, count = 2 } = req.query;
  const data = await Questions.getAll(product_id, page, count);
  res.send(data);
}

async function getAllAnswersOfQuestion(req, res) {
  const { question_id } = req.params;
  const data = await Answers.getAllByQuestionId(question_id);
  res.send(data);
}
module.exports.getAll = getAll;
module.exports.getAllAnswersOfQuestion = getAllAnswersOfQuestion;
