const { pool } = require('./Questions');

async function getAllByQuestionId(questionId, page, count) {
  const answersQuery =
    'SELECT * FROM answers WHERE question_id = $1 LIMIT $2 OFFSET $3';
  const answers = await pool.query(answersQuery, [
    questionId,
    count,
    (page - 1) * count
  ]);
  return answers.rows;
}

module.exports.getAllByQuestionId = getAllByQuestionId;
