# Atelier-QNA

## API Endpoints

### Questions

- **GET `/api/qa/questions`**: Retrieve all questions. Can include query parameters:
  - `product_id` (required): ID of the product to get questions for.
  - `page` (optional): Page number for pagination, default is 1.
  - `count` (optional): Number of questions per page, default is 5.

- **POST `/api/qa/questions`**: Submit a new question. Body should include:
  - `body`: Text of the question.
  - `name`: Name of the asker.
  - `email`: Email address of the asker.
  - `product_id`: ID of the related product.

- **PUT `/api/qa/questions/:question_id/helpful`**: Mark a question as helpful.
  - `question_id`: ID of the question to update.

- **PUT `/api/qa/questions/:question_id/report`**: Report a question.
  - `question_id`: ID of the question to report.

### Answers

- **GET `/api/qa/questions/:question_id/answers`**: Get all answers for a question.
  - `question_id`: ID of the question.

- **POST `/api/qa/questions/:question_id/answers`**: Submit a new answer to a question.
  - `question_id`: ID of the question.
  - Body should include:
    - `body`: Text of the answer.
    - `name`: Name of the answerer.
    - `email`: Email address of the answerer.
    - `photos`: Array of photo URLs (optional, up to 5 URLs).

- **PUT `/api/qa/answers/:answer_id/helpful`**: Mark an answer as helpful.
  - `answer_id`: ID of the answer to update.

- **PUT `/api/qa/answers/:answer_id/report`**: Report an answer.
  - `answer_id`: ID of the answer to report.
