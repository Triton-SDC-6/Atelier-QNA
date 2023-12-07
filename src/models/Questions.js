const { Pool } = require('pg');

const pool = new Pool({
  user: 'lance',
  host: 'localhost',
  database: 'qna',
  port: 5432
});

async function getAll(productId, page, count) {
  const queryString = `SELECT * FROM questions WHERE product_id=${productId} LIMIT ${count} OFFSET ${
    (page - 1) * count
  }`;
  const result = await pool.query(queryString);
  return result.rows;
}

module.exports.getAll = getAll;
