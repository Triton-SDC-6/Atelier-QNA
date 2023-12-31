const { pool } = require('./Questions');

async function getAllByQuestionId(questionId, page, count) {
  const answersQuery =
    'SELECT * FROM answers WHERE question_id = $1 AND reported = FALSE LIMIT $2 OFFSET $3';
  const answers = await pool.query(answersQuery, [
    questionId,
    count,
    (page - 1) * count
  ]);
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
  const combinedResults = answers.rows.map(answer => ({
    ...answer,
    photos: photosByAnswer[answer.id] || [],
  }));
  return combinedResults;
}

async function createOne(answerBody) {
  const answerQuery = `INSERT INTO answers(question_id, body, date_written, answerer_name, answerer_email) VALUES($1, $2, $3, $4, $5) RETURNING *`;
  const {
    questionId,
    body,
    answererName = 'Anonymous',
    answererEmail
  } = answerBody;
  const dateWritten = new Date().toISOString();
  const response = await pool.query(answerQuery, [
    questionId,
    body,
    dateWritten,
    answererName,
    answererEmail
  ]);
  return response.rows;
}

async function helpful(answer_id) {
  const helpfulQuery = `UPDATE answers SET helpful = helpful + 1 WHERE id = $1 RETURNING *`;
  const result = await pool.query(helpfulQuery, [answer_id]);
  return result.rows;
}

async function report(answer_id) {
  const reqportQuery = `UPDATE answers SET reported = TRUE WHERE id = $1 RETURNING *`;
  const result = await pool.query(reqportQuery, [answer_id]);
  return result.rows;
}

module.exports.getAllByQuestionId = getAllByQuestionId;
module.exports.createOne = createOne;
module.exports.helpful = helpful;
module.exports.report = report;
