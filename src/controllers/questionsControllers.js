const Questions = require('../models/Questions');
const Answers = require('../models/Answers');
const Photos = require('../models/Photos');

async function getAll(req, res) {
  const { product_id, page = 1, count = 5 } = req.query;
  const data = await Questions.getAll(product_id, page, count);
  res.send(data);
}

async function createOneQuestion(req, res) {
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
  const data = await Answers.getAllByQuestionId(
    Number(question_id),
    page,
    count
  );
  res.send(data);
}

async function createOneAnswer(req, res) {
  const { question_id } = req.params;
  const { body, name, email, photos } = req.body;
  const answerResponse = await Answers.createOne({
    questionId: question_id,
    body,
    answererName: name,
    answererEmail: email
  });
  let photosResponse = [];
  if (photos && photos.length > 0) {
    photosResponse = await Photos.createMany(answerResponse[0].id, photos);
  }

  res.send({ answerResponse, photosResponse: photosResponse });
}

async function markQuestionHelpful(req, res) {
  const { question_id } = req.params;
  const data = await Questions.helpful(Number(question_id));
  res.send(data);
}

async function reportQuestion(req, res) {
  const { question_id } = req.params;
  const data = await Questions.report(Number(question_id));
  res.send(data);
}

module.exports.getAll = getAll;
module.exports.createOneQuestion = createOneQuestion;
module.exports.getAllAnswersOfQuestion = getAllAnswersOfQuestion;
module.exports.createOneAnswer = createOneAnswer;
module.exports.markQuestionHelpful = markQuestionHelpful;
module.exports.reportQuestion = reportQuestion;
