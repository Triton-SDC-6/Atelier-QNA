const express = require('express');
const app = express();
const questionsRouter = require('./routes/questionsRouter');
const answersRouter = require('./routes/answersRouter');
const PORT = 3000;

app.use(express.json());

app.use('/api/qa/questions', questionsRouter);
app.use('/api/qa/answers', answersRouter);

app.all('*', (req, res) => {
  res.status(404).json({ message: 'resource not found.' });
});

app.listen(PORT, () => {
  console.log(`Listen to http://localhost:${PORT}`);
});
