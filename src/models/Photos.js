const { pool } = require('./Questions');

async function createMany(answerId, photos) {
  const photosQueryBase = `INSERT INTO answers_photos (answer_id, url) VALUES `;
  const values = [];
  const rows = photos.map((photo, index) => {
    values.push(answerId, photo);
    return `($${2 * index + 1}, $${2 * index + 2})`;
  });
  const photosQuery = photosQueryBase + rows.join(',') + ' RETURNING *';
  const response = await pool.query(photosQuery, values);
  return response.rows;
}

module.exports.createMany = createMany;
