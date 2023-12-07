const Questions = require('../models/Questions');
const Answers = require('../models/Answers');

async function getAll(req, res) {
  const { product_id, page = 1, count = 5 } = req.query;
  const data = await Questions.getAll(product_id, page, count);
  res.send(data);
}

async function createOne(req, res) {
  const { body, name, email, product_id } = req.body;
  const data = await Questions.createOne({
    productId: product_id,
    body,
    askerName: name,
    askerEmail: email
  });
  res.send(data);
}

async function getAllAnswersOfQuestion(req, res) {
  const { question_id } = req.params;
  const { page = 1, count = 5 } = req.query;
  const data = await Answers.getAllByQuestionId(question_id, page, count);
  res.send(data);
}
module.exports.getAll = getAll;
module.exports.createOne = createOne;
module.exports.getAllAnswersOfQuestion = getAllAnswersOfQuestion;
