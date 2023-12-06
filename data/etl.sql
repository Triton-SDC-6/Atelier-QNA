-- How to use this file:
-- Make sure three .csv files are somewhere in you local machine. Change file path according to your file structure.
-- Connect to your PostgreSQL database using psql:
--   psql -U your_username -d your_database (* make sure the database has been created already)
-- Execute the script using the \i command in psql:
--   \i /path/to/etl.sql //(Replace /path/to/etl.sql with the actual path to this file relative to your command line.)

-- Create actual questions table if it doesn't exist
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    body TEXT,
    date_written TIMESTAMP,
    asker_name VARCHAR(255),
    asker_email VARCHAR(255),
    reported BOOLEAN,
    helpful INTEGER
);

-- Create temporary questions table
CREATE TEMP TABLE temp_questions (
    id INTEGER,
    product_id INTEGER,
    body TEXT,
    date_written BIGINT,
    asker_name VARCHAR(255),
    asker_email VARCHAR(255),
    reported BOOLEAN,
    helpful INTEGER,
    PRIMARY KEY (id)
);

-- Create actual answers table if it doesn't exist
CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER,
    body TEXT,
    date_written TIMESTAMP,
    answerer_name VARCHAR(255),
    answerer_email VARCHAR(255),
    reported BOOLEAN,
    helpful INTEGER,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Create temporary answers table
CREATE TEMP TABLE temp_answers (
    id INTEGER,
    question_id INTEGER,
    body TEXT,
    date_written BIGINT,
    answerer_name VARCHAR(255),
    answerer_email VARCHAR(255),
    reported BOOLEAN,
    helpful INTEGER,
    PRIMARY KEY (id)
);

-- Create answers_photos table if it doesn't exist
CREATE TABLE IF NOT EXISTS answers_photos (
    id SERIAL PRIMARY KEY,
    answer_id INTEGER,
    url TEXT,
    FOREIGN KEY (answer_id) REFERENCES answers(id)
);

-- Use \copy for client-side CSV file loading
\copy temp_questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/lance/Documents/Dev/Hack/Atelier-QNA/data/questions.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');
\copy temp_answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) FROM '/Users/lance/Documents/Dev/Hack/Atelier-QNA/data/answers.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');


-- Insert data into the actual tables with date conversion
INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
SELECT id, product_id, body, to_timestamp(date_written / 1000), asker_name, asker_email, reported, helpful
FROM temp_questions;

INSERT INTO answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
SELECT id, question_id, body, to_timestamp(date_written / 1000), answerer_name, answerer_email, reported, helpful
FROM temp_answers;

-- Drop the temporary tables
DROP TABLE temp_questions;
DROP TABLE temp_answers;

\copy answers_photos (id, answer_id, url) FROM '/Users/lance/Documents/Dev/Hack/Atelier-QNA/data/answers_photos.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');

-- After importing, adjust the sequences of ID serial for each table
SELECT setval('questions_id_seq', (SELECT MAX(id) FROM questions));
SELECT setval('answers_id_seq', (SELECT MAX(id) FROM answers));
SELECT setval('answers_photos_id_seq', (SELECT MAX(id) FROM answers_photos));