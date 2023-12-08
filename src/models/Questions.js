const { Pool } = require('pg');

const pool = new Pool({
  user: 'lance',
  host: 'localhost',
  database: 'qna',
  port: 5432
});

async function getAll(productId, page, count) {
  const questionsQuery =
    'SELECT * FROM questions WHERE product_id = $1 AND reported = FALSE LIMIT $2 OFFSET $3';
  const questions = await pool.query(questionsQuery, [
    productId,
    count,
    (page - 1) * count
  ]);
  const questionIds = questions.rows.map(question => question.id);
  const answersQuery = 'SELECT * FROM answers WHERE question_id = ANY($1)';
  const answers = await pool.query(answersQuery, [questionIds]);
  const answersByQuestion = answers.rows.reduce((acc, answer) => {
    if (!acc[answer.question_id]) {
      acc[answer.question_id] = [];
    }
    acc[answer.question_id].push(answer);
    return acc;
  }, {});

  const answerIds = answers.rows.map(answer => answer.id);
  const photosQuery = 'SELECT * FROM answers_photos WHERE answer_id = ANY($1)';
  const photos = await pool.query(photosQuery, [answerIds]);
  const photosByAnswer = photos.rows.reduce((acc, photo) => {
    if (!acc[photo.answer_id]) {
      acc[photo.answer_id] = [];
    }
    acc[photo.answer_id].push(photo);
    return acc;
  }, {});

  const combinedResults = questions.rows.map(question => {
    const answersObject = (answersByQuestion[question.id] || []).reduce(
      (obj, answer) => {
        obj[answer.id] = {
          ...answer,
          photos: photosByAnswer[answer.id] || []
        };
        return obj;
      },
      {}
    );
    return { ...question, answers: answersObject };
  });

  return combinedResults;
}

async function createOne(questionBody) {
  const questionQuery = `INSERT INTO questions(product_id, body, date_written, asker_name, asker_email) VALUES($1, $2, $3, $4, $5) RETURNING *`;
  const { productId, body, askerName = 'Anonymous', askerEmail } = questionBody;
  const dateWritten = new Date().toISOString();
  const response = await pool.query(questionQuery, [
    productId,
    body,
    dateWritten,
    askerName,
    askerEmail
  ]);
  return response.rows;
}

async function helpful(question_id) {
const helpfulQuery = `UPDATE questions SET helpful = helpful + 1 WHERE id = $1 RETURNING *`;
  const result = await pool.query(helpfulQuery, [question_id]);
  return result.rows;
}

async function report(question_id) {
  const reqportQuery = `UPDATE questions SET reported = TRUE WHERE id = $1 RETURNING *`;
  const result = await pool.query(reqportQuery, [question_id]);
  return result.rows;
}

module.exports.pool = pool;
module.exports.getAll = getAll;
module.exports.createOne = createOne;
module.exports.helpful = helpful;
module.exports.report = report;
